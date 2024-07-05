import express from 'express';
import { crearReservaController } from '../controllers/reservas/crearReservaController.js';
import { cancelarReservaController } from '../controllers/reservas/cancelarReservaController.js';
import aprobarReservaController from '../controllers/reservas/aprobarReservaController.js';
import borrarReservaSalaController from '../controllers/reservas/borrarReservaSalaController.js';

import { checkIfGroup } from '../middleware/checkIfGroup.js';
// import authUser from '../middleware/authUser.js';
// import salaExists from '../middleware/salaExists.js';

const router = express.Router();

// Endpoint para que el grupo cree una reserva
router.post('/reservar-sala/:sala_id', checkIfGroup, crearReservaController);

// Endpoint para que el grupo borre una reserva si no está confirmada
router.delete('/cancelar-reserva/:sala_id', cancelarReservaController);

// Endpoint para que la sala pueda aprobar/cancelar una reserva
router.put('/aprobar-reserva/:reserva_id', aprobarReservaController);

// Endpoint para que la sala borre una reserva si no está confirmada
router.delete('/borrar-reserva/:reserva_id', borrarReservaSalaController);

export default router;
