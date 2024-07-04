import express from 'express';
import { registerUserController } from '../controllers/users/index.js';
import validateUserController from '../controllers/users/validateUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { passwordChangeController } from '../controllers/users/passwordChangeController.js';
import { requestPasswordReset } from '../controllers/users/requestPasswordResetController.js';
import { resetPasswordToken } from '../controllers/users/tokenReset.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

//Endpoint validación de usuarios
router.get('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Editar la contraseña de un usuario una vez logeado
router.patch('/users/password', passwordChangeController);

// Endpoint de recuperación de contraseña
router.post('/users/resetPassword', requestPasswordReset);
router.post('/users/tokenResetPassword', resetPasswordToken);

export default router;
