import express from 'express';

// Funciones controladoras intermedias
import {
    authUser,
    userExists,
    checkIfAdvertiser,
} from '../middleware/index.js';

// Funciones controladoras finales
import {
    createAdvertiserController,
    getAdvertiserDetailsController,
    editAdvertiserController,
    createAdvertController,
    listAdvertCategoriesController,
    listAdvertPackagesController,
} from '../controllers/advertiser/index.js';

const router = express.Router();

// Endpoint para crear empresa anunciante
router.post(
    '/create-advertiser/:userId',
    authUser,
    userExists,
    checkIfAdvertiser,
    createAdvertiserController
);

// Endpoint para mostrar los datos de un anunciante
router.get(
    '/advertiser-details/:userId',
    authUser,
    userExists,
    checkIfAdvertiser,
    getAdvertiserDetailsController
);

// Endpoint para que anunciante pueda editar sus datos
router.put(
    '/advertiser-details/:userId/edit',
    authUser,
    userExists,
    checkIfAdvertiser,
    editAdvertiserController
);

// Endpoint para crear un anuncio
router.post(
    '/create-advert/:userId',
    authUser,
    userExists,
    checkIfAdvertiser,
    createAdvertController
);

// Endpoint para listar las categorías
router.get('/advert-categories', listAdvertCategoriesController);

// Endpoint para listar los packages
router.get('/advert-packages', listAdvertPackagesController);

// // Endpoint para que el usuario pueda listar sus notices
// router.get(
//     '/noticeboard/user/:userId',
//     authUser,
//     userExists,
//     listMyOwnNoticesController
// );

// // Endpoint para mostrar detalle de un notice
// router.get(
//     '/noticeboard/:idNotice',
//     authUser,
//     userExists,
//     noticeExists,
//     getNoticeDetailController
// );

// // Endpoint para que un usuario pueda borrar su notice
// router.delete(
//     '/delete-notice/:idNotice',
//     authUser,
//     userExists,
//     canEditNotice,
//     deleteNoticeController
// );

// // Endpoint para que un usuario pueda editar su notice
// router.put(
//     '/noticeboard/:idNotice/edit',
//     authUser,
//     userExists,
//     canEditNotice,
//     editNoticeController
// );

// // Endpoint para listar y filtrar notice aprobadas
// router.get('/noticeboard?', listNoticesController);

export default router;
