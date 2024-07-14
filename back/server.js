import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';

import routes from './src/routes/index.js';

import { PORT, UPLOADS_DIR } from './env.js';
// import staticFilesMiddleware from './src/middleware/staticFiles.js';

const app = express();
app.use(morgan('dev'));
app.use(cors());

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use('/uploads', express.static(UPLOADS_DIR));

app.use(express.json());

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
app.use(fileUpload());

// Usar el middleware para archivos estáticos
// staticFilesMiddleware(app);

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
