# mock server
## config file schema
```
        {
            name: 'a custom name',
            request: {
                method: 'GET',
                // regular expression of mock url. (note called with test directly)
                urlPattern: /https:\/\/api-sandbox.tradeshiftchina.cn\/tradeshift\/rest\/external\/account\/info\/user/
            },
            enabled: true,
            response: {
                // [option] response status code, default is 200
                statusCode: 200,
                // [option] response headers, default is {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
                header: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                // [Mandatory]
                // response body can be a json string
                body: `{"id": "sfsfsf"}`
                // response body can also be a module with a function exported, this exported function will called with requestDetails
                // body: `
                //     function test(request) {return {id: request.url}};
                //     module.exports = test;
                // `
            }
        }
```
