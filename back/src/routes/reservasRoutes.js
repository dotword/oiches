import express from 'express';
import { crearReservaController } from '../controllers/reservas/crearReservaController.js';
import { cancelarReservaController } from '../controllers/reservas/cancelarReservaController.js';
import aprobarReservaController from '../controllers/reservas/aprobarReservaController.js';
import { checkIfGroup } from '../middleware/checkIfGroup.js';

const router = express.Router();

// Endpoint crear una reserva
router.post('/reservar-sala/:sala_id', checkIfGroup, crearReservaController);

//Endpoint cancelar una reserva
router.delete('/cancelar-reserva/:sala_id', cancelarReservaController);

// Endpoint aprobar una reserva
router.patch('/aprobar-reserva/:reserva_id', aprobarReservaController);

export default router;
