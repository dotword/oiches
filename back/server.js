import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';

import routes from './src/routes/index.js';

import { PORT, UPLOADS_DIR } from './env.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(fileUpload());

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use('/uploads', express.static(UPLOADS_DIR));

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
