const getPort = require('get-port');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverRoutes = require('./routes/index');
const CacheService = require('./service/cache.service');
const ConfigService = require('./service/config.service');

const initConfig = async () => {
    CacheService.setUIServerPort(await getPort());
    CacheService.setProxyUIPort(await getPort());
    ConfigService.init();
};

(async () => {

    await initConfig();


    app.all('*', (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });

    // todo move prefix out of here
    app.use(bodyParser.json());
    app.use('/proxy', serverRoutes.proxy);
    app.use('/system', serverRoutes.system);
    app.use('/rules/mock-server', serverRoutes.mockServer);
    app.use('/rules/v4-inspector', serverRoutes.v4Inspector);

    app.listen(CacheService.getUIServerPort(), function () {
        console.log(`UI Server listening on port ${CacheService.getUIServerPort()}`);
    });

    // todo remove //
    // require('./service/proxy.service').startProxy();

})();







