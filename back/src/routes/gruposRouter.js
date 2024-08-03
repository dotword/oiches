import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    hasOneGroup,
    checkIfGroup,
    canEditGrupoFiles,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    listGruposController,
    deleteGrupoMediaController,
    addGrupoMediaController,
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    deleteGrupoController
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

router.delete('/grupos/delete/:grupoId',authUser,deleteGrupoController)
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

// Endpoint listado de grupos con filtro, búsqueda y ordenación
router.get('/grupos?', listGruposController);
export default router;
