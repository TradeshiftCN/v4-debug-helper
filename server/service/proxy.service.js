const proxyConfig = require('../config');
const AnyProxy = require('anyproxy');

const mockServerRule = require('../rules/builtin/mock-server/index');
const v4InspectRule = require('../rules/builtin/v4-inspector/index');

const CacheService = require('./cache.service');

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
let options = {
    port: 0,
    rule: rulesCollector,
    webInterface: {
        enable: true,
        webPort: 0
    },
    dangerouslyIgnoreUnauthorized: true,
    forceProxyHttps: true,
    silent: !proxyConfig.logAllRequest
};

class ProxyService {

    constructor(){
        this.proxyServerInstance = null;
    }

    startProxy() {

        if(this.proxyServerInstance && this.proxyServerInstance.status === 'READY') {
            return;
        }

        options.port = 8001;
        options.webInterface.webPort = CacheService.getProxyUIPort();

        this.proxyServerInstance = new AnyProxy.ProxyServer(options);

        this.proxyServerInstance.on('ready', () => {
            console.log(`proxy start on port ${options.port}, web interface is on port ${options.webInterface.webPort}`);
        });
        this.proxyServerInstance.on('error', (e) => {
            console.error('proxy server start error ', e)
        });
        this.proxyServerInstance.start();

    };

    stopProxy () {
        if(this.proxyServerInstance && this.proxyServerInstance.status !== 'CLOSED') {
            this.proxyServerInstance.close();
        }
    };

}

module.exports = new ProxyService();





