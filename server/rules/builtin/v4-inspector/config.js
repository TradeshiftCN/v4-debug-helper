module.exports = {
    inspectUrlsPattern: [
        /https:\/\/dev\.cn-northwest-1\.test\.bwtsi\.cn\/v4\/apps\/Tradeshift.\w+/,
        /https:\/\/sandbox\.tradeshiftchina\.cn\/v4\/apps\/Tradeshift\.\w+/,
        /https:\/\/go\.tradeshift\.com\/v4\/apps\/Tradeshift\.\w+/,
        /http:\/\/10\.133\.\d+.\d+:8080\/v4\/apps\/Tradeshift\.\w+/
    ],
    appRedirectMapping: {
        CompanyProfile: 'http://localhost:8321'
    }
};
