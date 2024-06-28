import express from 'express';
import { getSalaDetailController } from '../controllers/salas/index.js';

const router = express.Router();

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

export default router;
