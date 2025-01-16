import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const devLogger = createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp(), logFormat),
    transports: [new transports.Console()],
});

const prodLogger = createLogger({
    level: 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
