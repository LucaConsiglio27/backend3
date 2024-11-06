// src/app.js
const express = require('express');
const logger = require('./config/logger')(process.env.NODE_ENV || 'development');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.set('logger', logger);

app.use('/', routes);

logger.info("Servidor iniciado");
app.listen(3000, () => logger.info('Server listening on port 3000'));
