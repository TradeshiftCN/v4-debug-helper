const requireFromString = require('require-from-string');

const ConfigService = require('../../../service/config.service');

const getMockRule = (method, url) =>
    ConfigService.getRuleMockServerConfig().rules.find(rule => rule.enabled && rule.request.method === method && new RegExp(rule.request.urlPattern.replace(/\?/,'\\?')).test(url));

const defaultHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

module.exports = {
    summary: 'mocker server',
    *beforeSendRequest(requestDetail) {
        const mockRule = getMockRule(requestDetail.requestOptions.method, requestDetail.url);
        if(mockRule) {
            console.debug(`mock ${requestDetail.url} start....`);
            const bodyContent = mockRule.response.body;
            let realBody = bodyContent;
            if(bodyContent.indexOf('module.exports') > -1) {
                realBody = requireFromString(realBody);
                if(realBody instanceof Function){
                    realBody = realBody(requestDetail);
                    if(typeof realBody === 'object'){
                        realBody = JSON.stringify(realBody);
                    }
                }
            }
            console.debug(`mock ${requestDetail.url} success `);

            return {
                response: {
                    statusCode: mockRule.response.statusCode || 200,
                    header: Object.assign({}, defaultHeader, mockRule.response.header),
                    body: realBody
                }
            }

        }
    }
};
