import express from 'express';

// Funciones controladoras intermedias
import {
    authUser,
    userExists,
    checkIfAdvertiser,
    canEditAdvert,
    isAdmin,
} from '../middleware/index.js';

// Funciones controladoras finales
import {
    createAdvertiserController,
    getAdvertiserDetailsController,
    editAdvertiserController,
    createAdvertController,
    listAdvertCategoriesController,
    listAdvertPackagesController,
    listMyOwnAdvertsController,
    editAdvertController,
    getAdvertDetailsController,
    editAdvertPosterController,
    deleteAdvertController,
    listAdvertsController,
    publishAdvertController,
    listPublishedAdvertsController,
    clickAdvertController,
    getAdvertClicksController,
    resetAdvertClicksController,
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

// Endpoint para que el usuario pueda listar sus anuncios
router.get(
    '/advertiser-adList/user/:userId',
    authUser,
    userExists,
    listMyOwnAdvertsController
);

// Endpoint para traer un anuncio por su ID
router.get('/advert/:idAdvert', getAdvertDetailsController);

// Endpoint para que un usuario pueda editar su advert
router.put(
    '/edit-advert/:idAdvert',
    authUser,
    userExists,
    checkIfAdvertiser,
    canEditAdvert,
    editAdvertController
);

//Editar fotos del anuncio
router.put(
    '/edit-advert/poster/:idAdvert',
    authUser,
    userExists,
    canEditAdvert,
    editAdvertPosterController
);

// // Endpoint para que un anunciante pueda borrar su anuncio
router.delete(
    '/delete-advert/:idAdvert',
    authUser,
    userExists,
    canEditAdvert,
    deleteAdvertController
);

// Endpoint para que el admin pueda listar y filtrar todos los advert
router.get('/adverts?', authUser, isAdmin, listAdvertsController);

// Endpoint listar y filtrar los advert publicados
router.get('/published-adverts?', listPublishedAdvertsController);

// Endpoint para que el admin apruebe un anuncio
router.put(
    '/published-advert/:idAdvert',
    authUser,
    isAdmin,
    publishAdvertController
);

// Endpoint cuando el anuncio es clicado
router.post('/adverts/:id/click', clickAdvertController);

// Endpoint para leer el contador
router.get('/adverts/:id/clicks', getAdvertClicksController);

// Endpoint para resetear los clics de un anuncio
router.delete(
    '/delete-clics/:idAdvert',
    authUser,
    isAdmin,
    resetAdvertClicksController
);

export default router;
