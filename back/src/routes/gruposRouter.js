import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import { editGrupoController } from '../controllers/grupos/index.js';
import { addGrupoPhotoController } from '../controllers/grupos/index.js';

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

// Agregar fotos a un grupo.
router.post(
    '/grupos/:idGrupo/photos',
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    addGrupoPhotoController
);

export default router;
