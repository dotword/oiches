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
    editUserEmailController,
    editUserAvatarController
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

//Editar email del perfil usuario
router.put('/users/email/:userId', authUser, userExists, editUserEmailController);

//Editar avatar usuario
router.put('/users/avatar/:userId',authUser,userExists,editUserAvatarController);

export default router;
