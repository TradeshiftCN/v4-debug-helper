module.exports = {
    proxyPort: 8001,
    rules: {
        builtin: {
            'mock-server': {
                enabled: true
            },
            'v4-inspector': {
                enabled: true
            }
        }
    }
};
