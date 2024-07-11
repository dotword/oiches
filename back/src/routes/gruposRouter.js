import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    addGrupoPhotoController,
    getGrupoDetailController,
    deleteGrupoPhotoController,
} from '../controllers/grupos/index.js';

const router = express.Router();

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

export default router;
