const router = require('express').Router();
const waitUntil = require('async-wait-until');
const proxyService = require('../service/proxy.service');
const Response = require('../service/response.dto');

router.put('/start', (req, res) => {
    proxyService.startProxy();

    return waitUntil(() => {
        return proxyService.status().status === 'READY';
    }, 5000, 100).then(() => {
        res.send(new Response({
            data: 'started'
        }));
    }).catch(e => {
        res.status(500).send(new Response({
            error: 'sorry, failed  to start proxy, please try to restart application.'
        }));
    });
});

router.put('/stop', (req, res) => {
    proxyService.stopProxy();
    return waitUntil(() => {
        return proxyService.status().status === 'CLOSED';
    }, 5000, 100).then(() => {
        res.send(new Response({
            data: 'stopped'
        }));
    }).catch(e => {
        res.status(500).send(new Response({
            error: 'sorry, failed  to stop proxy, please try to restart application.'
        }));
    });
});

router.get('/status', (req, res) => {
    res.send(new Response({
        data: proxyService.status()
    }));
});

module.exports = router;
