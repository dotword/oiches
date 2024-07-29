import express from 'express';

// Importamos las funciones controladoras intermedias.
import { authUser, userExists, canEditUser } from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    registerUserController,
    validateUserController,
    loginUserController,
    passwordChangeController,
    sendRecoverPassController,
    editUserPassController,
    editUserEmailController,
    editUserAvatarController,
    getOwnUserController,
    getSalaListController,
} from '../controllers/users/index.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

//Endpoint validación de usuarios
router.get('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Editar la contraseña de un usuario una vez logeado
router.patch('/users/password', authUser, passwordChangeController);

// Enviar email de recuperación de contraseña.
router.post('/users/password/recover', sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put('/users/password', editUserPassController);

// Perfil privado del usuario
router.get('/users', authUser, getOwnUserController);

//Editar email del perfil usuario
router.put(
    '/users/email/:userId',
    authUser,
    userExists,
    canEditUser,
    editUserEmailController
);

//Editar avatar usuario
router.put(
    '/users/avatar/:userId',
    authUser,
    userExists,
    canEditUser,
    editUserAvatarController
);

// Devuelve listado de salas de usuario tipo salal
router.get('/users/salas', authUser, userExists, getSalaListController);

export default router;
