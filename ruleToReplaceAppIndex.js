const config = require('./config.json');
const rp = require('request-promise');
const cheerio = require('cheerio');
const get = require('lodash/get');
const axios = require('axios')
const merge = require('lodash/merge')

const hackUrlReg = /^https?:\/\/.*(\.bwtsi\.cn|\.tradeshift\.com|\.tradeshiftchina\.cn|10\.133\.\d+\.\d+:8080)\/v4\/apps\/\w+\.\w+$/;
const jenkins = /.*cn\.ci\.bwtsi\.cn.*/

const getConfigScript = html => get(html.match(/<script type="text\/javascript">\s+var __config = \{.+\};\s+<\/script>/), 0, '');

const getAppNameFromUrl = requestUrl => requestUrl.match(/Tradeshift\..+/)[0].replace('Tradeshift.', '');

const wanted = [
    'InventoryManagement',
    'ReportToolkit',
    'GoodsReceipt',
    'InsightCenter',
    'PurchaseRequestV2',
    'DelegateInventory',
    'Configurator',
    'ViewManager',
]
// 重新组织config.json里面的config.redirectV4AppIndexUrl数据
// 返回值类型是{'DEFAULT': 'redirect_url', appName: 'redirect_url', ...}
const prepareRedirectData = () => {
    const appUrlMap = {};
    Object.keys(config.redirectV4AppIndexUrl).forEach(url => {
        config.redirectV4AppIndexUrl[url].forEach(appName => appUrlMap[appName] = url);
    });
    return appUrlMap;
};

const appRedirectMapping = prepareRedirectData();

const getRedirectUrl = sourceUrl => {
    const appName = getAppNameFromUrl(sourceUrl);
    return appRedirectMapping[appName] || appRedirectMapping['DEFAULT'];
}

const insertConfig = (html, configScript, redirectIndex) => {
    const $ = cheerio.load(html, {xmlMode: true});
    // 在 v4/config/webpack/webpack.config.dev.js 中开启了 dynamicPublicPath
    // 并且 __config.CDN_URL 在 v4/src/client/globals.js 中修改了 __webpack_public_path__
    // 导致 hmr 地址不正确
    $('body').prepend(configScript.replace(/"CDN_URL":"[^"]*"/, `"CDN_URL":"${redirectIndex}"`));
    $('*').each((index, element) => {
        if (element.name === 'script') {
            const attrSrc = $(element).attr('src');
            if (attrSrc && (attrSrc.indexOf('/webpack') === 0 || attrSrc.indexOf('/locale.js') === 0 || attrSrc.indexOf('/bundles') === 0)) {
                $(element).attr('src', redirectIndex + attrSrc);
            }
        }
        if (element.name === 'link') {
            const attrSrc = $(element).attr('href');
            if (attrSrc && (attrSrc.indexOf('/webpack') === 0)) {
                $(element).attr('href', redirectIndex + attrSrc);
            }
        }
        if (!$(element).html()) {
            $(element).html(' ');
        }

    });
    return $.html();
};

module.exports = {
    summary: 'a rule to replace app index',
    *beforeSendRequest(requestDetail) {
        const proxyHead = 'wf-proxy'
        if(requestDetail.url.includes(proxyHead)) {
            let hostIp;
            if(requestDetail.url.includes('cn-inventory-management')) {
                hostIp = '10.133.9.129:8805'
            }else {
                hostIp = '10.133.8.179:8661'
            }
            const targetHost = `http://${hostIp}`
            return axios.get(`${targetHost}${requestDetail.url.split(proxyHead)[1]}`, {
                headers: merge(requestDetail.requestOptions.headers, {
                    Host: hostIp
                })
            })
            .then(({ status, headers, data }) =>{
                return {
                    response: {
                        statusCode: status,
                        header: headers,
                        body: JSON.stringify(data)
                    }
                }
            })
            .catch(e => console.log(e))
        }
    },
    *beforeSendResponse(requestDetail, responseDetail) {
        const originUrl = requestDetail.url.split('?')[0] || ''
        if( !jenkins.test(originUrl)
            && hackUrlReg.test(originUrl)
            && wanted.includes(getAppNameFromUrl(originUrl))
        ) {
            const redirectIndex = getRedirectUrl(requestDetail.url)
            const newResponse = responseDetail.response;
            const body = newResponse.body.toString();
            const originalConfigScript = getConfigScript(body);
            const redirectAppUrl = redirectIndex + requestDetail.requestOptions.path.replace('/v4','');
            const logStr = `redirect ${requestDetail.url} to ${redirectAppUrl}`;

            console.time(logStr);
            console.info(`start ${logStr} \r\n`);

            return rp({url: redirectAppUrl, headers: requestDetail.requestOptions.headers}).then(html => {
                let newRedirectHtml = html.replace('__config', '__configOriginal');
                newResponse.body = insertConfig(newRedirectHtml, originalConfigScript, redirectIndex);
                console.timeEnd(logStr);
                return {response: newResponse};
            }).catch(err => {
                console.error(`Error ${redirectAppUrl}\r\n`);
                throw err;
            });
        }
    }
};
