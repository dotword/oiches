import express from 'express';
import { crearReservaController } from '../controllers/reservas/crearReservaController.js';
import { checkIfGroup } from '../middleware/checkIfGroup.js';
import { cancelarReservaController } from '../controllers/reservas/cancelarReservaController.js';
const router = express.Router();

// Endpoint registro de usuarios
router.post('/reservar-sala/:sala_id',checkIfGroup, crearReservaController);
router.delete('/cancelar-reserva/:sala_id',cancelarReservaController)
//Endpoint validación de usuarios

export default router;
