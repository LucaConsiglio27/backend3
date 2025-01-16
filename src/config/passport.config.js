const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Transporte de consola
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    }),
    // Transporte de archivo para errores
    new winston.transports.File({
      filename: 'error.log',
      level: 'error', // Solo guarda errores o niveles más altos
    }),
  ],
});

module.exports = logger;
