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

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
