import express from 'express';
import { registerUserController } from '../controllers/users/index.js';
import validateUserController from '../controllers/users/validateUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { passwordChangeController } from '../controllers/users/passwordChangeController.js';
import { resetPasswordController} from '../controllers/users/resetPasswordController.js';
import { tokenVerificationResetPasswordController } from '../controllers/users/tokenVerificationResetPasswordController.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

//Endpoint validación de usuarios
router.put('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Editar la contraseña de un usuario
router.patch('/users/password', passwordChangeController);

//endpoint cambio contraseña
router.post('/users/resetpassword', resetPasswordController);

router.post('users/tokenVerification/:isValidToken', tokenVerificationResetPasswordController);

export default router;
