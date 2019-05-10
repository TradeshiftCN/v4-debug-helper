const router = require('express').Router();

router.get('/config', (req, res) => {
    res.send('config');
});

/**
 * new hack url
 */
router.post('/hack-url', (req, res) => {
    res.send('config');
});

/**
 * update hack url
 */
router.put('/hack-url/:name', (req, res) => {
    res.send('config');
});

/**
 * delete hack url
 */
router.delete('/hack-url/:name', (req, res) => {
    res.send('config');
});

/**
 * new app-mapping
 */
router.post('/app-mapping', (req, res) => {
    res.send('config');
});

/**
 * update app-mapping
 */
router.put('/app-mapping/:appId', (req, res) => {
    res.send('config');
});

/**
 * delete app-mapping
 */
router.delete('/app-mapping/:appId', (req, res) => {
    res.send('config');
});



// get rules/mock-server/config
// post rules/mock-server/mock (new mock)
// put  rules/mock-server/mock/[name] (update mock)
// delete  rules/mock-server/mock/[name] (delete mock)





module.exports = router;
