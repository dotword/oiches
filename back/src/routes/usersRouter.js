import express from 'express';
import { registerUserController } from '../controllers/users/index.js';
import validateUserController from '../controllers/users/validateUserController.js'
import { loginUserController } from '../controllers/users/loginUserController.js';
import { passwordChangeController } from '../controllers/users/passwordChangeController.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

router.post('/users/login', loginUserController);
router.patch('/users/password', passwordChangeController);

//Endpoint validación de usuarios
router.put('/users/validate/:registrationCode',validateUserController);

export default router;
