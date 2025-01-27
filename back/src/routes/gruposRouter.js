import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    checkIfGroup,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    listGruposController,
    deleteGrupoMediaController,
    addGrupoMediaController,
    addGrupoGeneroController,
    deleteGrupoGeneroController,
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    deleteGrupoController,
    setMainPhotoController,
} from '../controllers/grupos/index.js';

const router = express.Router();

// Crear un nuevo grupo
router.post(
    '/users/grupo/:userId',
    authUser,
    userExists,
    checkIfGroup,
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
// Borrar grupo
router.delete(
    '/grupos/delete/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    deleteGrupoController
);
// Añadir media a un grupo
router.post(
    '/grupos/media/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    addGrupoMediaController
);

// Añadir generos a un grupo
router.post(
    '/grupos/generos/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    addGrupoGeneroController
);

// Borrar generos de un grupo
router.delete(
    '/grupos/generos/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    deleteGrupoGeneroController
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

// Seleccionar una foto como principal
router.put(
    '/grupos/:idGrupo/fotos/:photoId/main',
    authUser,
    userExists,
    canEditGrupo,
    setMainPhotoController
);

// Borrar files de un grupo
router.delete(
    '/grupos/:photoName/:deletePhoto/:idGrupo',
    authUser,
    userExists,
    canEditGrupo,
    deleteFileGrupoController
);

// Endpoint detalle grupo
router.get('/grupos/:idGrupo', grupoExists, getGrupoDetailController);

// Endpoint listado de grupos con filtro, búsqueda y ordenación
router.get('/grupos?', listGruposController);

export default router;
