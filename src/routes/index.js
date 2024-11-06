// src/routes/index.js
const express = require('express');
const mocksRouter = require('./mocks.router');

const router = express.Router();
router.use('/api/mocks', mocksRouter);

module.exports = router;
