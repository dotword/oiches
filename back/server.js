'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './src/routes/index.js';
import fileUpload from 'express-fileupload';

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
//Middleware para analizar solicitudes
app.use(fileUpload());
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
