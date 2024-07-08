import express from 'express';
import listGenreController from '../controllers/listas/index.js';

const router = express.Router();

router.get('/generos', listGenreController);

export default router;
