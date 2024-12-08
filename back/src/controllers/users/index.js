import registerUserController from './registerUserController.js';
import validateUserController from './validateUserController.js';
import loginUserController from './loginUserController.js';
import passwordChangeController from './passwordChangeController.js';
import sendRecoverPassController from './sendRecoverPassController.js';
import editUserPassController from './editUserPassController.js';
import editUserEmailController from './editUserEmailController.js';
import editUserAvatarController from './editUserAvatarController.js';
import getOwnUserController from './getOwnUserController.js';
import { deleteUserController } from './deleteUserController.js';
import { deleteSalaController } from '../salas/deleteSalaController.js';
import getUserOwnerController from './getUserOwnerController.js';
import selectUserByNameController from './selectUserByNameController.js';
import getUserGrupoSalaController from './getUserGrupoSalaController .js';
import getUserByIdController from './getUserByIdController .js';
import accountUserController from './accountUserController.js';
import getAllUsersListController from './getAllUsersListController.js';
import addToMailchimpController from './addToMailchimpController.js';

export {
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
    deleteSalaController,
    getUserOwnerController,
    selectUserByNameController,
    getUserGrupoSalaController,
    getUserByIdController,
    accountUserController,
    getAllUsersListController,
    addToMailchimpController,
};
