import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    checkIfGroup,
    authUser,
    checkIfGroup,
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
} from '../middleware/index.js';

import {
    crearReservaController,
    cancelarReservaController,
    aprobarReservaController,
    borrarReservaSalaController,
    listReservaController,
} from '../controllers/reservas/index.js';

const router = express.Router();

// Endpoint para que el grupo cree una reserva
router.post('/reservar-sala/:sala_id',authUser, checkIfGroup, crearReservaController);

// Endpoint para que el grupo borre una reserva si no está confirmada
router.delete('/cancelar-reserva/:reserva_id',authUser, cancelarReservaController);

// Endpoint para que la sala pueda aprobar una reserva
router.put(
    '/aprobar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    aprobarReservaController
);

// Endpoint para que la sala borre una reserva si no está confirmada
router.delete(
    '/borrar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    borrarReservaSalaController
);

// Endpoint para listar reservas de una sala
router.get('/reservas/:sala_id', authUser,listReservaController);

export default router;
