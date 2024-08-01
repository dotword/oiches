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
    checkIfGroup,
    canEditGrupoFiles,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    listGruposController,
    voteGrupoController,
    deleteGrupoMediaController,
    addGrupoMediaController,
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    getGrupoVotosController,
} from '../controllers/grupos/index.js';

const router = express.Router();

// Crear un nuevo grupo
router.post(
    '/users/grupo',
    authUser,
    userExists,
    checkIfGroup,
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

// Borrar media de un grupo
router.delete(
    '/grupos/media/:mediaDelete/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    deleteGrupoMediaController
);

// Añadir media a un grupo
router.post(
    '/grupos/media/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    addGrupoMediaController
);

// Añadir rider a un grupo
router.post(
    '/grupos/rider/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    addPdfGrupoController
);

// Añadir fotos a un grupo
router.post(
    '/grupos/photos/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    addPhotosGrupoController
);

// Borrar files de un grupo
router.delete(
    '/grupos/:photoName/:deletePhoto',
    authUser,
    userExists,
    canEditGrupoFiles,
    deleteFileGrupoController
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

// Endpoint votos hechos por un grupo
router.get('/grupos/votos/:idGrupo', getGrupoVotosController);

// Endpoint listado de grupos con filtro, búsqueda y ordenación
router.get('/grupos?', listGruposController);

export default router;
