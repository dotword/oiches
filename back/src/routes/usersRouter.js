import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
authUser,
userExists,
} from '../middleware/index.js'

// Importamos las funciones controladoras finales.
import {
    registerUserController,
    validateUserController,
    loginUserController,
    passwordChangeController,
    sendRecoverPassController,
    editUserPassController,
    editUserController,
} from '../controllers/users/index.js';


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

//Editar perfil usuario
router.put('/users/edit/:userId', authUser, userExists, editUserController);

export default router;
