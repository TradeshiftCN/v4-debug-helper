const router = require('express').Router();

router.get('/config', (req, res) => {
    res.send('config');
});

/**
 * new mock
 */
router.post('/mock', (req, res) => {
    res.send('config');
});

/**
 * update mock
 */
router.put('/mock/:name', (req, res) => {
    res.send('config');
});

/**
 * delete mock
 */
router.delete('/mock/:name', (req, res) => {
    res.send('config');
});


module.exports = router;
