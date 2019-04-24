const proxyConfig = require('../config');
const AnyProxy = require('anyproxy');

let proxyServerInstance = null;

/**
 * config url http://anyproxy.io/cn/#%E4%BD%9C%E4%B8%BAnpm%E6%A8%A1%E5%9D%97%E4%BD%BF%E7%94%A8
 */
const options = {
    port: proxyConfig.proxyPort,
    rule: require(proxyConfig.currentRule),
    webInterface: {
        enable: true,
        webPort: proxyConfig.proxyWebPort
    },
    dangerouslyIgnoreUnauthorized: true,
    forceProxyHttps: true,
    silent: !proxyConfig.logAllRequest
};


const startProxy = () => {

    console.log('----proxyServerInstance------', proxyServerInstance);

    if(proxyServerInstance && proxyServerInstance.status === 'READY') {
        return;
    }

    proxyServerInstance = new AnyProxy.ProxyServer(options);

    proxyServerInstance.on('ready', () => {
        console.log(`proxy start on port ${options.port}, web interface is on port ${options.webInterface.webPort}`);
    });
    proxyServerInstance.on('error', (e) => {
        console.error('proxy server start error ', e)
    });
    proxyServerInstance.start();

};


const stopProxy = () => {
    if(proxyServerInstance) {
        proxyServerInstance.close();
    }
};

module.exports = {
    startProxy,
    stopProxy
};





