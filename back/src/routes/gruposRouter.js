import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    hasOneGroup,
    checkIfSala,
    salaCanVote,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    listGruposController,
    voteGrupoController,
} from '../controllers/grupos/index.js';

const router = express.Router();

// Crear un nuevo grupo
router.post(
    '/users/grupo',
    authUser,
    userExists,
    hasOneGroup,
    createGrupoController
);

// Actualizar un grupo
router.put(
    '/grupos/:idGrupo/edit',
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    editGrupoController
);

// Endpoint detalle grupo
router.get('/grupos/:idGrupo', grupoExists, getGrupoDetailController);

//Endpoint grupo votos y comentarios de una sala a un grupo
router.post(
    '/grupos/:idReserva/votes',
    authUser,
    userExists,
    checkIfSala,
    salaCanVote,
    voteGrupoController
);

// Endpoint listado de grupos con filtro, búsqueda y ordenación
router.get('/grupos?', listGruposController);

export default router;
