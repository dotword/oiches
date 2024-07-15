import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    hasOneGroup,
    checkIfSala,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    addGrupoPhotoController,
    getGrupoDetailController,
    deleteGrupoPhotoController,
    createGrupoController,
    voteGrupoController
} from '../controllers/grupos/index.js';

import { listGruposController } from '../controllers/grupos/listGruposController.js';
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

// Agregar fotos y pdf a un grupo.
router.post(
    '/grupos/:idGrupo/file',
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    addGrupoPhotoController
);

// Eliminar archivo del grupo.
router.delete(
    '/grupos/:idGrupo/file/:fileId',
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    deleteGrupoPhotoController
);

// Endpoint detalle grupo
router.get('/grupos/:idGrupo', grupoExists, getGrupoDetailController);

//Endpoint grupo votos y comentarios
router.post('/grupos/:idGrupo/votes',authUser,userExists,checkIfSala,grupoExists,voteGrupoController)

// Endpoint listado de grupos con filtro, búsqueda y ordenación
router.get('/grupos?', listGruposController);


export default router;
