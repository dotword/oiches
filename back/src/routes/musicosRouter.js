import express from 'express';
import listGenreController from '../controllers/musicos/listGenreController.js';

const router = express.Router();

router.get('/generos',listGenreController);

export default router;
