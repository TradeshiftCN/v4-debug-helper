const AnyProxy = require('anyproxy');
const getPort = require('get-port');
const waitUntil = require('async-wait-until');

const mockServerRule = require('../rules/builtin/mock-server/index');
const v4InspectRule = require('../rules/builtin/v4-inspector/index');

const CacheService = require('./cache.service');
const ConfigService = require('./config.service');

const isRuleEnabled = ruleName => ConfigService.getSystemConfig().rules.builtin[ruleName].enabled;

const rulesCollector = {
    summary: 'mock server and v4 inspect',
    *beforeSendRequest(sourceRequest) {
        if(isRuleEnabled('mock-server')){
            return yield mockServerRule.beforeSendRequest(sourceRequest);
        }
    },
    *beforeSendResponse(sourceRequest, sourceResponse) {
        if(isRuleEnabled('v4-inspector')){
            return yield v4InspectRule.beforeSendResponse(sourceRequest, sourceResponse);
        }
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
    silent: true
};

class ProxyService {

    constructor(){
        this.proxyServerInstance = null;
    }

    async startProxy() {

        if(this.proxyServerInstance && this.proxyServerInstance.status === 'READY') {
            return Promise.resolve();
        }

        options.port = ConfigService.getSystemConfig().proxyPort;
        options.webInterface.webPort = CacheService.getProxyUIPort();

        if(await this.isPortInUse(options.port)){
            throw new Error(`port ${options.port} already in use, please change to other port`);
        }

        if(options.port === options.webInterface.webPort){
            throw new Error('proxy port and web interface web port can not be same.');
        }

        this.proxyServerInstance = new AnyProxy.ProxyServer(options);

        this.proxyServerInstance.on('ready', () => {
            console.log(`proxy start on port ${options.port}, web interface is on port ${options.webInterface.webPort}`);
        });
        this.proxyServerInstance.on('error', (e) => {
            console.error('proxy server start error ', e)
        });
        this.proxyServerInstance.start();

        return  waitUntil(() => this.status().status === 'READY', 5000, 100)
            .catch(e => {
                console.error('proxy start error', e);
                throw new Error('failed to start proxy, please try to restart application.');
            })
    };

    async stopProxy () {
        if(this.proxyServerInstance && this.proxyServerInstance.status !== 'CLOSED') {
            this.proxyServerInstance.close();
            return waitUntil(() => {
                return this.status().status === 'CLOSED';
            }, 5000, 100).catch(e => {
                console.error('proxy stop error', e);
                throw new Error('failed to stop proxy, please try to restart application.');
            });
        }
        return Promise.resolve();
    };

    status() {
        if(this.proxyServerInstance){
            return {
                proxyHostName: this.proxyServerInstance.proxyHostName,
                proxyPort: this.proxyServerInstance.proxyPort,
                proxyType: this.proxyServerInstance.proxyType,
                proxyWebinterfaceConfig: this.proxyServerInstance.proxyWebinterfaceConfig,
                status: this.proxyServerInstance.status
            };
        } else {
            return {
                status: 'SYS_ERROR_NOT_INIT'
            }
        }
    }

    async isPortInUse(port) {
        return port !== await getPort({port});
    }

}

module.exports = new ProxyService();





