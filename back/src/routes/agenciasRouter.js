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
    listAgenciasController,
    hiddeAgenciaController,
    nextPrevAgenciaController,
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

// Ocultar/Mostrar agencia y sus músicos
router.put(
    '/agencia/hidde-agencia/:idAgencia',
    authUser,
    userExists,
    agenciaExists,
    canEditAgencia,
    hiddeAgenciaController
);

// Endpoint detalle agencia
router.get('/agencia/:idAgencia', agenciaExists, getAgenciaDetailController);

// Endpoint de filtro/búsqueda y ordenación
router.get('/agencias?', listAgenciasController);

// Endpoint para navegador post (agencia anterior/siguiente)
router.get(
    '/agencia/:idAgencia/prevnext',
    agenciaExists,
    nextPrevAgenciaController
);

export default router;
