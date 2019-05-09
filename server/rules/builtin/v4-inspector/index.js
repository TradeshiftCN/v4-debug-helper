const config = require('./config.js');
const rp = require('request-promise');
const cheerio = require('cheerio');

const getConfigScript = html => html.match(/<script type="text\/javascript">\s+var __config = \{.+\};\s+<\/script>/)[0];

const getAppIdFromUrl = requestUrl => requestUrl.match(/Tradeshift\..+/)[0].replace('Tradeshift.', '');

const getRedirectUrl = sourceUrl => {
    const appId = getAppIdFromUrl(sourceUrl);
    const redirectConfig = config.appRedirectMapping.find(redirectConfig => redirectConfig.enabled && redirectConfig.appId === appId);
    return redirectConfig && redirectConfig.redirectUrl;
};

const insertConfig = (html, configScript, redirectIndex) => {
    const $ = cheerio.load(html, {xmlMode: true});
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

const shouldInspect = url => config.inspectUrls.some(urlConfig => urlConfig.enabled && urlConfig.pattern.test(url));

module.exports = {
    summary: 'v4 app inspector',
    *beforeSendResponse(requestDetail, responseDetail) {

        if(shouldInspect(requestDetail.url)) {
            const redirectIndex = getRedirectUrl(requestDetail.url);
            if(!redirectIndex) {
                return null;
            }
            const newResponse = responseDetail.response;
            const body = newResponse.body.toString();
            const originalConfigScript = getConfigScript(body);
            const redirectAppUrl = redirectIndex + requestDetail.requestOptions.path.replace('/v4','');
            const logStr = `redirect ${requestDetail.url} to ${redirectAppUrl}`;

            console.time(logStr);
            console.info('start ' + logStr);

            return rp(redirectAppUrl).then(html => {
                let newRedirectHtml = html.replace('__config', '__configOriginal');
                newResponse.body = insertConfig(newRedirectHtml, originalConfigScript, redirectIndex);
                console.timeEnd(logStr);
                return {response: newResponse};
            }).catch(err => {
                console.error(`request ${redirectAppUrl} error: `, err.message);
                throw err;
            });
        }
    }
};
