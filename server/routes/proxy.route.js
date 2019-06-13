const fs = require('fs');
const router = require('express').Router();
const waitUntil = require('async-wait-until');
const proxyService = require('../service/proxy.service');
const Response = require('../service/response.dto');

const certFileTypes = ['crt', 'cer', 'pem', 'der'];

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

router.put('/rootca', async (req, res) => {
    const rootCAPath = await proxyService.getRootCAPath();
    const fileType = certFileTypes.indexOf(req.query.type) !== -1 ? req.query.type : 'crt';
    res.setHeader('Content-Type', 'application/x-x509-ca-cert');
    res.setHeader('Content-Disposition', `attachment; filename="rootCA.${fileType}"`);
    res.end(fs.readFileSync(rootCAPath, { encoding: null }));
});

module.exports = router;
