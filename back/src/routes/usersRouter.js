import express from 'express';
import { registerUserController } from '../controllers/users/index.js';
import validateUserController from '../controllers/users/validateUserController.js'

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);
router.post('/users/login', registerUserController);

//Endpoint validación de usuarios
router.put('/users/validate/:registrationCode',validateUserController);

export default router;
