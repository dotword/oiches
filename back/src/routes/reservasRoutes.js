import express from 'express';
import { crearReservaController } from '../controllers/reservas/crearReservaController.js';
import { checkIfGroup } from '../middleware/checkIfGroup.js';
const router = express.Router();

// Endpoint registro de usuarios
router.post('/reservar-sala/:sala_id',checkIfGroup, crearReservaController);

//Endpoint validación de usuarios

export default router;
