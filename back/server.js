'use strict';

import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());

const { PORT } = process.env;

/**Llamado a rutas */
app.use(routes);

app.use((req, res) => {
    res.status(404).send('Recurso no encontrado');
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
