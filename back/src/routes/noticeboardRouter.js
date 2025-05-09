import express from 'express';

// Funciones controladoras intermedias
import {
    authUser,
    userExists,
    noticeExists,
    canEditNotice,
} from '../middleware/index.js';

// Funciones controladoras finales
import {
    createNoticeboardController,
    listCategoriesNoticeController,
    getNoticeDetailController,
    listNoticesController,
    listMyOwnNoticesController,
    editNoticeController,
    deleteNoticeController,
} from '../controllers/noticeboard/index.js';

const router = express.Router();

// Endpoint para crear un notice
router.post(
    '/create-notice/:userId',
    authUser,
    userExists,
    createNoticeboardController
);

// Endpoint para listar las categorías
router.get('/categories-noticeboard', listCategoriesNoticeController);

// Endpoint para que el usuario pueda listar sus notices
router.get(
    '/noticeboard/user/:userId',
    authUser,
    userExists,
    listMyOwnNoticesController
);

// Endpoint para mostrar detalle de un notice
router.get(
    '/noticeboard/:idNotice',
    authUser,
    userExists,
    noticeExists,
    getNoticeDetailController
);

// Endpoint para que un usuario pueda borrar su notice
router.delete(
    '/delete-notice/:idNotice',
    authUser,
    userExists,
    canEditNotice,
    deleteNoticeController
);

// Endpoint para que un usuario pueda editar su notice
router.put(
    '/noticeboard/:idNotice/edit',
    authUser,
    userExists,
    canEditNotice,
    editNoticeController
);

// Endpoint para listar y filtrar notice aprobadas
router.get('/noticeboard?', listNoticesController);

export default router;
