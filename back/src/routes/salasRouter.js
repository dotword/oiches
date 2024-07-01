import express from 'express';
import { getSalaDetailController } from '../controllers/salas/index.js';
import createSalaController from '../controllers/salas/createSalaController.js';
import authUser from '../middleware/authUser.js';
import salaExists from '../middleware/salaExists.js';
import validatorSalas from '../middleware/validatorSalas.js';
import uploadFiles from '../middleware/uploadFiles.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post('/users/salas',authUser,salaExists,validatorSalas(),createSalaController);

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

//Endpoint para aplicar middleware de subir archivos
router.post('/uploads/', uploadFiles);

export default router;
