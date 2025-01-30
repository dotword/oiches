import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    checkIfGroup,
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    canEditSala,
} from '../middleware/index.js';

import {
    crearReservaController,
    borrarReservaGrupoController,
    aprobarReservaController,
    borrarReservaSalaController,
    listReservasSalasController,
    listReservasGroupsController,
    fechasDisponiblesSalaController,
    showFechasDisponiblesSalaController,
    deleteFechasDisponiblesSalaController,
    toggleCalendarActiveController,
    tramitarReservaController,
    cambiarFechaReservaController,
} from '../controllers/reservas/index.js';

const router = express.Router();

// Enpoint para que la sala active al calendario
router.patch(
    '/reservas/salas/:idSala/calendar-active',
    authUser,
    userExists,
    checkIfSala,
    canEditSala,
    toggleCalendarActiveController
);

// Endpoint para que la sala registre fechas disponibles
router.post(
    '/reservas/salas/:idSala/fechas-disponibles',
    authUser,
    userExists,
    checkIfSala,
    canEditSala,
    fechasDisponiblesSalaController
);

// Endpoint para que la sala cambie fecha disponible a no disponible
router.delete(
    '/reservas/salas/:idSala/fechas-disponibles',
    authUser,
    userExists,
    checkIfSala,
    canEditSala,
    deleteFechasDisponiblesSalaController
);

// Endpoint para mostrar en el calendario las fechas disponibles
router.get(
    '/salas/:idSala/fechas-disponibles',
    authUser,
    userExists,
    showFechasDisponiblesSalaController
);

// Endpoint para que el grupo cree una reserva
router.post(
    '/reservar-sala/:sala_id',
    authUser,
    checkIfGroup,
    crearReservaController
);

// Endpoint para que la sala borre una reserva
router.delete(
    '/borrar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    borrarReservaSalaController
);

// Endpoint para que la sala tramite reserva
router.put(
    '/tramitar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    tramitarReservaController
);

// Endpoint para que la sala pueda cambiar la fecha una reserva
router.put(
    '/cambiar-fecha-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    cambiarFechaReservaController
);

// Endpoint para que la sala pueda aprobar una reserva
router.put(
    '/aprobar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfSala,
    canEditReserva,
    aprobarReservaController
);

// Endpoint para que el grupo borre una reserva
router.delete(
    '/cancelar-reserva/:reserva_id',
    authUser,
    userExists,
    checkIfGroup,
    borrarReservaGrupoController
);

// Endpoint para listar reservas de una sala
router.get(
    '/reservas/salas/:sala_id',
    authUser,
    userExists,
    checkIfSala,
    listReservasSalasController
);

// Endpoint para listar reservas de un grupo
router.get(
    '/reservas/grupos/:group_id',
    authUser,
    userExists,
    checkIfGroup,
    listReservasGroupsController
);

export default router;
