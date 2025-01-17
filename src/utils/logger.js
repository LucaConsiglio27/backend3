import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

// Definimos los niveles personalizados, incluyendo 'fatal'
const customLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
    verbose: 6,
    silly: 7,
};

// Formato del log
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Logger para desarrollo (sin colorize, ya que está causando problemas)
const devLogger = createLogger({
    levels: customLevels, // Usamos los niveles personalizados
    level: 'debug',
    format: combine(timestamp(), logFormat), // Eliminamos colorize temporalmente
    transports: [new transports.Console()],
});

// Logger para producción
const prodLogger = createLogger({
    levels: customLevels,
    level: 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

// Selección de logger según el entorno
const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
