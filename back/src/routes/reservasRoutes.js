import express from 'express';

// Importamos las funciones controladoras intermedias.
import { checkIfGroup } from '../middleware/index.js';

import {
    crearReservaController,
    cancelarReservaController,
    aprobarReservaController,
    borrarReservaSalaController,
    listReservaController,
} from '../controllers/reservas/index.js';

const router = express.Router();

// Endpoint para que el grupo cree una reserva
router.post('/reservar-sala/:sala_id', checkIfGroup, crearReservaController);

// Endpoint para que el grupo borre una reserva si no está confirmada
router.delete('/cancelar-reserva/:reserva_id', cancelarReservaController);

// Endpoint para que la sala pueda aprobar/cancelar una reserva
router.put('/aprobar-reserva/:reserva_id', aprobarReservaController);

// Endpoint para que la sala borre una reserva si no está confirmada
router.delete('/borrar-reserva/:reserva_id', borrarReservaSalaController);

// Endpoint para listar reservas de una sala
router.get('/reservas/:sala_id', listReservaController);

export default router;
