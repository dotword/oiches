import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    agenciaExists,
    canEditAgencia,
    checkIfAgencia,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    createAgenciaController,
    editAgenciaController,
    getAgenciaDetailController,
    deleteAgenciaController,
} from '../controllers/agencias/index.js';

const router = express.Router();

//Endpoint crear una agencia
router.post(
    '/users/agencia/:userId',
    authUser,
    userExists,
    checkIfAgencia,
    createAgenciaController
);

// Actualizar una agencia
router.put(
    '/agencia/:idAgencia/edit',
    authUser,
    userExists,
    agenciaExists,
    canEditAgencia,
    editAgenciaController
);

// Borrar una agencia
router.delete(
    '/agencia/delete/:idAgencia',
    authUser,
    userExists,
    agenciaExists,
    canEditAgencia,
    deleteAgenciaController
);

// Endpoint detalle agencia
router.get('/agencia/:idAgencia', agenciaExists, getAgenciaDetailController);

// Endpoint de filtro/búsqueda y ordenación
// router.get('/salas?', listSalasController);

export default router;
