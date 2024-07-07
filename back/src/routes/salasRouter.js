import express from 'express';
import { getSalaDetailController } from '../controllers/salas/index.js';
import createSalaController from '../controllers/salas/createSalaController.js';
import authUser from '../middleware/authUser.js';
import salaExists from '../middleware/salaExists.js';
import { listSalasController } from '../controllers/salas/listSalasController.js';
import addSalaPhotoController from '../controllers/salas/addSalaPhotoController.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post('/users/salas', authUser, salaExists, createSalaController);

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

// Endpoint de filtro/búsqueda y ordenación
router.get('/salas?', listSalasController);

// Agregar una foto a una entrada.
router.post(
    '/salas/:salaId/photos',
    // authUserController,
    // userExistsController,
    // entryExistsController,
    // canEditController,
    addSalaPhotoController
);

export default router;
