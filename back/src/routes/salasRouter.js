import express from 'express';
import { getSalaDetailController } from '../controllers/salas/index.js';
import createSalaController from '../controllers/salas/createSalaController.js';
import authUser from '../middleware/authUser.js';
import userExists from '../middleware/userExists.js';
import validatorSalas from '../middleware/validatorSalas.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post('/users/salas',authUser,userExists,validatorSalas(),createSalaController);

// Endpoint detalle sala
router.get('/salas/:idSala', getSalaDetailController);

export default router;
