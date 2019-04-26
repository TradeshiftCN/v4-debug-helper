module.exports = {
    rules: [
        {
            name: 'user',
            request: {
                method: 'GET',
                urlPattern: /https:\/\/api-sandbox.tradeshiftchina.cn\/tradeshift\/rest\/external\/account\/info\/user/
            },
            enabled: true,
            response: {
                statusCode: 200,
                header: {},
                body: `{id: "sfsfsf"}`
            }
        },
        {
            name: 'store',
            request: {
                method: 'GET',
                urlPattern: /https:\/\/api-sandbox.tradeshiftchina.cn\/tradeshift\/rest\/external\/apps\/store/
            },
            enabled: true,
            response: {
                statusCode: 200,
                header: {},
                // todo fix this bug
                body: `
                    function test(request) {return {id: request.url}};
                    module.exports = test;
                `
            }
        }
    ]
};
