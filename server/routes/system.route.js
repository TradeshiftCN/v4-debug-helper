const router = require('express').Router();
const ConfigService = require('../service/config.service');
const Response = require('./response');

router.get('/config', (req, res) => {
    res.send(new Response({
        data: ConfigService.getSystemConfig()
    }));
});

router.put('/config', (req, res) => {
    ConfigService.saveConfig('system.config', req.body);
    res.status(200).send(req.body)
});

module.exports = router;
