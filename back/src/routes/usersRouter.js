import express from 'express';
import { registerUserController } from '../controllers/users/index.js';
import validateUserController from '../controllers/users/validateUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { passwordChangeController } from '../controllers/users/passwordChangeController.js';
import sendRecoverPassController from '../controllers/users/sendRecoverPassController.js';
import editUserPassController from '../controllers/users/editUserPassController.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

//Endpoint validación de usuarios
router.get('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Editar la contraseña de un usuario una vez logeado
router.patch('/users/password', passwordChangeController);

// Enviar email de recuperación de contraseña.
router.post('/users/password/recover', sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put('/users/password', editUserPassController);

export default router;
