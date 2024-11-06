// src/routes/mocks.router.js
const express = require('express');
const { generateMockPets, generateMockUsers, insertMockData } = require('../controllers/data.controller');
const router = express.Router();

router.get('/mockingpets', generateMockPets);
router.get('/mockingusers', generateMockUsers);
router.post('/generateData', insertMockData);

router.get('/loggerTest', (req, res) => {
    const log = req.app.get('logger');
    log.debug("Debug message");
    log.http("HTTP message");
    log.info("Info message");
    log.warn("Warning message");
    log.error("Error message");
    log.fatal("Fatal message");
    res.send('Logs have been tested');
});

module.exports = router;
