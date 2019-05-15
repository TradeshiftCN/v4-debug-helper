const router = require('express').Router();
const ConfigService = require('../service/config.service');
const Response = require('../service/response.dto');
const schemaValidator = require('../service/schema.validator');
const hackUrlSchema = require('./schemas/v4-inspector-hack-url.schema');
const appMappingSchema = require('./schemas/v4-inspector-app-mapping.schema');
const updateConfig = config => ConfigService.saveConfig('rule-v4-inspector.config', config);

router.get('/config', (req, res) => {
    res.send(new Response({
        data: ConfigService.getRuleV4InspectorConfig()
    }));
});

/**
 * new hack url
 */
router.post('/hack-url', schemaValidator(hackUrlSchema), (req, res) => {

    let config =ConfigService.getRuleV4InspectorConfig();

    if(config.inspectUrls.find(inspectUrl => inspectUrl.name === req.body.name)){
        res.status(403).send(new Response({
            error: `hack-url ${req.body.name} already exits`
        }))
    } else {
        config.inspectUrls.push(req.body);
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    }
});

/**
 * update hack url
 */
router.put('/hack-url/:name', schemaValidator(hackUrlSchema), (req, res) => {
    let config =ConfigService.getRuleV4InspectorConfig();
    let matched = config.inspectUrls.find(inspectUrl => inspectUrl.name === req.params.name);
    if(matched) {
        matched.pattern = req.body.pattern;
        matched.enabled = req.body.enabled;
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    } else {
        res.status(404).send(new Response({
            error: `hack-url ${req.params.name} does not exits`
        }));
    }
});

/**
 * delete hack url
 */
router.delete('/hack-url/:name', (req, res) => {
    let config =ConfigService.getRuleV4InspectorConfig();
    config.inspectUrls = config.inspectUrls.filter(inspectUrl => inspectUrl.name !== req.params.name);
    updateConfig(config);
    res.send(new Response({
        data: 'success'
    }));
});

/**
 * new app-mapping
 */
router.post('/app-mapping', schemaValidator(appMappingSchema), (req, res) => {
    let config =ConfigService.getRuleV4InspectorConfig();

    if(config.appRedirectMapping.find(appRedirect => appRedirect.appId === req.body.appId)){
        res.status(403).send(new Response({
            error: `app-mapping ${req.body.appId} already exits`
        }))
    } else {
        config.appRedirectMapping.push(req.body);
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    }
});

/**
 * update app-mapping
 */
router.put('/app-mapping/:appId', schemaValidator(appMappingSchema), (req, res) => {
    let config =ConfigService.getRuleV4InspectorConfig();
    let matched = config.appRedirectMapping.find(appRedirect => appRedirect.appId === req.params.appId);
    if(matched) {
        matched.redirectUrl = req.body.redirectUrl;
        matched.enabled = req.body.enabled;
        updateConfig(config);
        res.send(new Response({
            data: 'success'
        }));
    } else {
        res.status(404).send(new Response({
            error: `app-mapping ${req.params.appId} does not exits`
        }));
    }
});

/**
 * delete app-mapping
 */
router.delete('/app-mapping/:appId', (req, res) => {
    let config =ConfigService.getRuleV4InspectorConfig();
    config.appRedirectMapping = config.appRedirectMapping.filter(appRedirect => appRedirect.appId !== req.params.appId);
    updateConfig(config);
    res.send(new Response({
        data: 'success'
    }));
});

module.exports = router;
