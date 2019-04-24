const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('About Ts MiddleMan');
});

router.get('/start', (req, res) => {
    const proxyService = require('../service/proxy.service');
    proxyService.startProxy();
    res.send('started');
});

router.get('/stop', (req, res) => {
    const proxyService = require('../service/proxy.service');

    proxyService.stopProxy();

    res.send('stopped');
});

// start
// stop
// update v4 helper config

module.exports = router;
