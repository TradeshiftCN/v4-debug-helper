module.exports = {
    inspectUrls: [
        {
            name: 'testing',
            pattern: /https:\/\/dev\.cn-northwest-1\.test\.bwtsi\.cn\/v4\/apps\/Tradeshift.\w+/,
            enabled: true
        },
        {
            name: 'sandbox',
            pattern: /https:\/\/sandbox\.tradeshiftchina\.cn\/v4\/apps\/Tradeshift\.\w+/,
            enabled: true
        },
        {
            name: 'prod',
            pattern: /https:\/\/go\.tradeshift\.com\/v4\/apps\/Tradeshift\.\w+/,
            enabled: true
        },
        {
            name: 'localStack',
            pattern: /http:\/\/10\.133\.\d+.\d+:8080\/v4\/apps\/Tradeshift\.\w+/,
            enabled: true
        },
    ],
    appRedirectMapping: [
        {
            appId: 'AppStore',
            redirectUrl: 'http://localhost:8321',
            enabled: true
        }
    ]
};
