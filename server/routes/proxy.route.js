const router = require('express').Router();
const proxyService = require('../service/proxy.service');


router.put('/start', (req, res) => {
    proxyService.startProxy();
    res.send('starting');
});

router.put('/stop', (req, res) => {
    proxyService.stopProxy();
    res.send('stopping');
});

router.get('/status', (req, res) => {
    res.send(proxyService.status());
});


module.exports = router;
