import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    canEditUser,
    isAdmin,
} from '../middleware/index.js';

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
    deleteUserController,
    getUserOwnerController,
    getUserGrupoSalaController,
    getUserByIdController,
    accountUserController,
    getAllUsersListController,
    addToMailchimpController,
    // selectUserByNameController
} from '../controllers/users/index.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

// Endpoint para añadir a Mailchimp en el registro
router.post('/add-to-mailchimp', addToMailchimpController);

//Endpoint validación de usuarios
router.get('/users/validate/:registrationCode', validateUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Editar la contraseña de un usuario una vez logeado
router.patch('/users/password', authUser, passwordChangeController);

// Enviar email de recuperación de contraseña.
router.post('/users/password/recover', sendRecoverPassController);

// Borrar usuario
router.delete('/users/delete', authUser, deleteUserController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put('/users/password', editUserPassController);

// Perfil privado del usuario
router.get('/users', authUser, getOwnUserController);

// Cuenta de usuario
router.get(
    '/users/account/:userId',
    authUser,
    canEditUser,
    accountUserController
);

// Perfil de cada usuario
router.get('/users/info/:userId', getUserByIdController);

// router.get('/users/chat/:name', authUser, selectUserByNameController);

// Listado de salas o grupos del usuario
router.get(
    '/users/owner/:userId',
    authUser,
    userExists,
    getUserOwnerController
);

router.get('/users/:name', authUser, getUserGrupoSalaController);

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

// Listar todos los usuarios para el Admin
router.get('/dashboard/users?', authUser, isAdmin, getAllUsersListController);

export default router;
