import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    checkIfSala,
    salaCanVote,
    checkIfGroup,
    grupoCanVote,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    voteGrupoController,
    getGrupoVotosController,
} from '../controllers/grupos/index.js';

import {
    voteSalaController,
    getSalaVotosController,
} from '../controllers/salas/index.js';

const router = express.Router();

//Endpoint votacion y comentarios de un grupo a una sala
router.post(
    '/salas/:idReserva/votes',
    authUser,
    userExists,
    checkIfGroup,
    grupoCanVote,
    voteSalaController
);

//Endpoint  votos y comentarios de una sala a un grupo
router.post(
    '/grupos/:idReserva/votes',
    authUser,
    userExists,
    checkIfSala,
    salaCanVote,
    voteGrupoController
);

// Endpoint votos hechos por un grupo
router.get('/grupos/votos/:idGrupo', getGrupoVotosController);

// Endpoint votos hechos por una sala
router.get('/salas/votos/:idSala', getSalaVotosController);

export default router;
