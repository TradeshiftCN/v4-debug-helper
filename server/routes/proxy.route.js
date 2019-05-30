const router = require('express').Router();
const waitUntil = require('async-wait-until');
const proxyService = require('../service/proxy.service');
const Response = require('../service/response.dto');

router.put('/start', (req, res) => {

    return proxyService.startProxy()
        .then(() => res.send(new Response({ data: 'started' })))
        .catch(e => {
            res.status(500).send(new Response({
                error: e && e.message
            }));
        })
});

router.put('/stop', (req, res) => {
    return proxyService.stopProxy()
        .then(() => res.send(new Response({data: 'stopped'})))
        .catch(e => {
            res.status(500).send(new Response({
                error: e && e.message
            }));
        });
});

router.get('/status', (req, res) => {
    res.send(new Response({
        data: proxyService.status()
    }));
});

module.exports = router;
