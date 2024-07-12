import express from 'express';

import {
    listGenreController,
    listProvinciasController,
} from '../controllers/listas/index.js';

const router = express.Router();

// Endpoint listado de generos musicales
router.get('/generos', listGenreController);

// Endpoint listado de provincias
router.get('/provincias', listProvinciasController);

export default router;
