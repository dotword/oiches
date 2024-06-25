'use strict';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

const { PORT } = process.env;

app.get('/', (req, res) => {
    res.send('Hola desde Oiches!!');
});

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
