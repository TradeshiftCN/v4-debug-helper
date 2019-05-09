const proxyConfig = require('../config');
const AnyProxy = require('anyproxy');

let proxyServerInstance = null;

const mockServerRule = require('../rules/builtin/mock-server/index');
const v4InspectRule = require('../rules/builtin/v4-inspector/index');

const rulesCollector = {
    summary: 'mock server and v4 inspect',
    *beforeSendRequest(sourceRequest) {
        return yield mockServerRule.beforeSendRequest(sourceRequest);
    },
    *beforeSendResponse(sourceRequest, sourceResponse) {
        return yield v4InspectRule.beforeSendResponse(sourceRequest, sourceResponse);
    }
};

/**
 * config url http://anyproxy.io/
 */
const options = {
    port: proxyConfig.proxyPort,
    rule: rulesCollector,
    webInterface: {
        enable: true,
        webPort: proxyConfig.proxyWebPort
    },
    dangerouslyIgnoreUnauthorized: true,
    forceProxyHttps: true,
    silent: !proxyConfig.logAllRequest
};


const startProxy = () => {

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
    if(proxyServerInstance && proxyServerInstance.status !== 'CLOSED') {
        proxyServerInstance.close();
    }
};

module.exports = {
    startProxy,
    stopProxy
};





