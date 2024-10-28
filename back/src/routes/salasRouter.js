import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    salaExists,
    canEditSala,
    checkIfSala,
    canEditPhoto,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    createSalaController,
    getSalaDetailController,
    listSalasController,
    editSalaController,
    deletePhotoSalaController,
    insertPhotosSalaController,
    setMainPhotoController,
    deleteSalaController,
    addSalaGeneroController,
    deleteSalaGeneroController,
    addRiderController,
} from '../controllers/salas/index.js';

const router = express.Router();

//Endpoint crear nueva sala por usuario tipo sala
router.post(
    '/users/salas/:userId',
    authUser,
    userExists,
    checkIfSala,
    createSalaController
);

// Actualizar una sala
router.put(
    '/salas/:idSala/edit',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    editSalaController
);

// Añadir generos a una sala
router.post(
    '/salas/generos/:idSala',
    authUser,
    userExists,
    canEditSala,
    addSalaGeneroController
);

// Borrar generos de una sala
router.delete(
    '/salas/generos/:idSala',
    authUser,
    userExists,
    canEditSala,
    deleteSalaGeneroController
);

// Añadir fotos a una sala
router.post(
    '/salas/photos/:idSala',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    insertPhotosSalaController
);

// Seleccionar una foto como principal
router.put(
    '/salas/:idSala/fotos/:photoId/main',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    setMainPhotoController
);

// Añadir rider a una sala
router.post(
    '/salas/rider/:idSala',
    authUser,
    userExists,
    canEditSala,
    addRiderController
);

// Borrar una sala
router.delete(
    '/salas/delete/:idSala',
    authUser,
    userExists,
    salaExists,
    canEditSala,
    deleteSalaController
);

// Borrar files de una sala
router.delete(
    '/salas/:photoName/:deletePhoto',
    authUser,
    userExists,
    canEditPhoto,
    deletePhotoSalaController
);

// Endpoint detalle sala
router.get('/salas/:idSala', salaExists, getSalaDetailController);

// Endpoint de filtro/búsqueda y ordenación
router.get('/salas?', listSalasController);

export default router;
