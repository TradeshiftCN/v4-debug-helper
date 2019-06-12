const _ = require('lodash');
const router = require('express').Router();
const uuid = require('uuid');
const ConfigService = require('../service/config.service');
const Response = require('../service/response.dto');
const schemaValidator = require('../service/schema.validator');
const mockServerRuleSchema = require('./schemas/mocker-server-rule.schema');
const updateConfig = config => ConfigService.saveConfig('rule-mock-server.config', config);


router.get('/config', (req, res) => {
    res.send(new Response({
        data: ConfigService.getRuleMockServerConfig()
    }));
});

/**
 * new mock
 */
router.post('/mock', schemaValidator(mockServerRuleSchema), (req, res) => {
    if(!req.body.id){
        req.body.id = uuid.v4();
    }
    let config = ConfigService.getRuleMockServerConfig();
    if (config.rules.find(rule => rule.id === req.body.id)) {
        res.status(403).send(new Response({
            error: `mock rule ${req.body.id} already exits`
        }));
    } else {
        config.rules.push(req.body);
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    }
});

/**
 * update mock
 */
router.put('/mock/:id', schemaValidator(mockServerRuleSchema), (req, res) => {
    let config = ConfigService.getRuleMockServerConfig();
    let matched = config.rules.find(rule => rule.id === req.params.id);
    if (matched) {
        delete req.body.id;
        _.extend(matched, req.body);
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    } else {
        res.status(404).send(new Response({
            error: `mock rule ${req.params.name} does not exits`
        }));
    }
});

/**
 * delete mock
 */
router.delete('/mock/:id', (req, res) => {
    let config = ConfigService.getRuleMockServerConfig();
    config.rules = config.rules.filter(rule => rule.id !== req.params.id);
    updateConfig(config);
    res.send(new Response({
        data: 'success'
    }));
});


module.exports = router;
