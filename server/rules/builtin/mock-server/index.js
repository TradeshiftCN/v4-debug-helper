const config = require('./config.js');

const requireFromString = require('require-from-string');

const getMockRule = (method, url) =>
    config.rules.find(rule => rule.enabled && rule.request.method === method && rule.request.urlPattern.test(url));

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
            console.debug(`mock ${requestDetail.url} success`);
            return {
                response: {
                    statusCode: mockRule.response.statusCode,
                    header: mockRule.response.header,
                    body: realBody
                }
            }

        }
    }
};
