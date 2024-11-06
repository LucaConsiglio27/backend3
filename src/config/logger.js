// src/config/logger.js
const { createLogger, format, transports } = require('winston');

const levels = { debug: 0, http: 1, info: 2, warning: 3, error: 4, fatal: 5 };

const logger = (environment) => {
  const fileTransport = new transports.File({ filename: 'errors.log', level: 'error' });
  const consoleTransport = new transports.Console({ format: format.combine(format.colorize(), format.simple()) });

  return createLogger({
    levels,
    level: environment === 'production' ? 'info' : 'debug',
    transports: environment === 'production' ? [consoleTransport, fileTransport] : [consoleTransport],
  });
};

module.exports = logger;
