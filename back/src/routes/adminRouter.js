import express from 'express';

// Importamos las funciones controladoras intermedias.
import { authUser, isAdmin, userExists } from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    getAllUsersListController,
    publishGrupoController,
    listAllReservasController,
    publishSalaController,
    publishAgenciaController,
    deleteAgenciaController,
    deleteSalaController,
} from '../controllers/admin/index.js';

const router = express.Router();

// Endpoint para el Admin: listar todas las reservas
router.get(
    '/reservas/listar?',
    authUser,
    userExists,
    isAdmin,
    listAllReservasController
);

// Listar todos los usuarios para el Admin
router.get('/dashboard/users?', authUser, isAdmin, getAllUsersListController);

// Endpoint para que el admin publique un grupo
router.put(
    '/published-grupo/:grupoId',
    authUser,
    isAdmin,
    publishGrupoController
);

// Endpoint para que el admin publique una sala
router.put('/published-sala/:salaId', authUser, isAdmin, publishSalaController);

// Endpoint para que el admin publique una agencia
router.put(
    '/published-agencia/:idAgencia',
    authUser,
    isAdmin,
    publishAgenciaController
);

// Endpoint para que el admin elimine un usuario tipo agencia y sus datos
router.delete(
    '/delete-agencia/:userId',
    authUser,
    isAdmin,
    userExists,
    deleteAgenciaController
);

// Endpoint para que el admin elimine un usuario tipo grupos y sus datos
router.delete(
    '/delete-grupo/:userId',
    authUser,
    isAdmin,
    userExists,
    deleteAgenciaController
);

// Endpoint para que el admin elimine un usuario tipo sala y sus datos
router.delete(
    '/delete-sala/:userId',
    authUser,
    isAdmin,
    userExists,
    deleteSalaController
);

export default router;
