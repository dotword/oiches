import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import routes from './src/routes/index.js';
import { startScheduledJobs } from './src/jobs/scheduledJobs.js';
import { PORT, UPLOADS_DIR, URL_FRONT, PRERENDER_TOKEN } from './env.js';
import prerender from 'prerender-node';

const app = express();

if (PRERENDER_TOKEN) {
    prerender.set('prerenderToken', PRERENDER_TOKEN);
    // Opcional: puedes configurar otros parámetros, como tiempo de espera
    // prerender.set('prerenderServiceUrl', 'https://service.prerender.io/');
    app.use(prerender);
}

app.use(morgan('dev'));
app.use(express.json());

// Configurar CORS
const allowedOrigins = [URL_FRONT]; // Tu frontend en producción
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes desde orígenes permitidos o localhost en desarrollo
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permitir envío de cookies o credenciales
};

app.use(cors(corsOptions)); // Aplica las opciones de CORS

app.use(fileUpload());
app.use('/uploads', express.static(UPLOADS_DIR));
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

// Iniciar los trabajos programados
startScheduledJobs();

// Use server for listen
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
