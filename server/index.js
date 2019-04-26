
const express = require('express');
const app = express();
const serverRoutes = require('./api/index');
const config = require('./config');

app.use(serverRoutes);

require('./service/proxy.service').startProxy();

app.listen(config.UIServerPort, function () {
    console.log(`UI Server listening on port ${config.UIServerPort}`);
});

