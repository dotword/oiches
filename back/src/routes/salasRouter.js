import express from 'express';
import { getSalaDetailController } from '../controllers/salas/index.js';
import createSalaController from '../controllers/salas/createSalaController.js';
import authUser from '../middleware/authUser.js';
import salaExists from '../middleware/salaExists.js';
import { listSalasController } from '../controllers/salas/listSalasController.js';
import uploadPhotos from '../middleware/uploadPhotos.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post('/users/salas', authUser, salaExists, createSalaController);

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

// Endpoint de filtro/búsqueda y ordenación
router.get('/salas?', listSalasController);

export default router;
