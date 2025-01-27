import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerDocument from './src/docs/swagger.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import logger from './src/utils/logger.js';
import mocksRouter from './src/routes/mocks.router.js';
import usersRouter from './src/routes/users.router.js';
import petsRouter from './src/routes/pets.router.js';
import adoptionRouter from './src/routes/adoption.router.js';
import sessionRouter from './src/routes/sessions.router.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static('uploads'));

// Routers
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoption', adoptionRouter);
app.use('/api/pets', petsRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/adoptions', adoptionRouter);

// Logger test endpoint
app.get('/loggerTest', (req, res) => {
    logger.debug('Debug log test');
    logger.http('HTTP log test');
    logger.info('Info log test');
    logger.warn('Warning log test');
    logger.error('Error log test');
    logger.fatal('Fatal log test');
    res.send('Logger test complete');
});

// Swagger documentation

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Database connection and server start
// Database connection and server start
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Conectado a la base de datos');
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en http://localhost:${3000}`);
        });
    })
    .catch((err) => {
        logger.fatal('Error al conectar a la base de datos');
        logger.error(err.message);
        process.exit(1);
    });

export default app;
