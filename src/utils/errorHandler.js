import logger from './logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
};

export default errorHandler;
