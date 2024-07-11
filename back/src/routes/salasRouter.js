import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    salaExists,
    canEditSala,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    createSalaController,
    getSalaDetailController,
    listSalasController,
    editSalaController,
    addSalaPhotoController,
} from '../controllers/salas/index.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post('/users/salas', authUser, salaExists, createSalaController);

// Actualizar una sala
router.put(
    '/salas/:idSala/edit',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    editSalaController
);

// Agregar una foto a una sala.
router.post(
    '/salas/:idSala/photos',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    addSalaPhotoController
);

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

// Endpoint de filtro/búsqueda y ordenación
router.get('/salas?', listSalasController);

export default router;
