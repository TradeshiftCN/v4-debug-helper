
const PROXY_UI_PORT = 'proxy_ui_port';
const UI_SERVER_PORT = 'ui_server_port';

class CacheService {

    constructor() {
        this._cache = {};
    }

    getValue(key) {
        return this._cache[key];
    }

    setValue(key, value) {
        this._cache[key] = value;
        return this;
    }

    setUIServerPort(port) {
        this.setValue(UI_SERVER_PORT, port);
    }

    getUIServerPort() {
        return this.getValue(UI_SERVER_PORT);
    }

    setProxyUIPort(port) {
        this.setValue(PROXY_UI_PORT, port);
    }

    getProxyUIPort() {
        return this.getValue(PROXY_UI_PORT);
    }
}

module.exports = new CacheService();
