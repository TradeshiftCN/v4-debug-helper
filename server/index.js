const getPort = require('get-port');
const express = require('express');
const app = express();
const serverRoutes = require('./api/index');
const CacheService = require('./service/cache.service');
const ConfigService = require('./service/config.service');

const initConfig = async () => {
    CacheService.setUIServerPort(await getPort());
    CacheService.setProxyUIPort(await getPort());
    ConfigService.init();
};

(async () => {

    await initConfig();

    app.use(serverRoutes);

    app.listen(CacheService.getUIServerPort(), function () {
        console.log(`UI Server listening on port ${CacheService.getUIServerPort()}`);
    });

    require('./service/proxy.service').startProxy();

})();







