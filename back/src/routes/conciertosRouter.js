import express from 'express';

import {
    authUser,
    userExists,
    isAdmin,
    concertExits,
} from '../middleware/index.js';

import {
    createNewConcertController,
    getConciertoDetailController,
    editConciertoController,
    editConciertoPosterController,
    borrarConciertoController,
    listConciertosController,
    listOldConciertosController,
} from '../controllers/conciertos/index.js';

const router = express.Router();

// Endpoint para crear un nuevo concierto
router.post(
    '/conciertos/crear/:reservaId',
    authUser,
    userExists,
    isAdmin,
    createNewConcertController
);

// Enpoint editar concierto
router.put(
    '/concierto/:conciertoId/edit',
    authUser,
    userExists,
    isAdmin,
    concertExits,
    editConciertoController
);
// Enpoint editar poster del concierto
router.put(
    '/concierto/:conciertoId/editPoster',
    authUser,
    userExists,
    isAdmin,
    concertExits,
    editConciertoPosterController
);

// Borrar concierto
router.delete(
    '/delete-concert/:conciertoId',
    authUser,
    userExists,
    isAdmin,
    concertExits,
    borrarConciertoController
);

// Enpoint detalle del concierto
router.get(
    '/concierto/:conciertoId',
    concertExits,
    getConciertoDetailController
);

// Enpoint listar y filtar todos los conciertos próximos
router.get('/conciertos?', listConciertosController);

// Enpoint listar los conciertos pasados
router.get('/conciertos-old', listOldConciertosController);

export default router;
