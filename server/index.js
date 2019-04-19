const proxyConfig = require('./config');
const AnyProxy = require('anyproxy');
/**
 * config url http://anyproxy.io/cn/#%E4%BD%9C%E4%B8%BAnpm%E6%A8%A1%E5%9D%97%E4%BD%BF%E7%94%A8
 */
const options = {
    port: proxyConfig.proxyPort,
    rule: require('./rules/builtin/v4-inspector/index.js'),
    webInterface: {
        enable: true,
        webPort: proxyConfig.proxyWebPort
    },
    dangerouslyIgnoreUnauthorized: true,
    forceProxyHttps: true,
    silent: !proxyConfig.logAllRequest
};
const proxyServer = new AnyProxy.ProxyServer(options);


proxyServer.on('ready', () => {
    console.log(`proxy start on port ${options.port}, web interface is on port ${options.webInterface.webPort}`);
});
proxyServer.on('error', (e) => {
    console.error('proxy server start error ', e)
});
proxyServer.start();
