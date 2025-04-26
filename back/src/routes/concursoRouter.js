import express from 'express';

import {
    authUser,
    userExists,
    checkIfGroup,
    grupoExists,
    canEditGrupo,
    isAdmin,
} from '../middleware/index.js';

import {
    createNewContestInscriptionController,
    getInfoInscriptionController,
    listadoInscripcionesController,
    unsubscribeContestInscriptionController,
    subscribeContestInscriptionController,
    listContestInscriptionsController,
    registerVoterEmailController,
    validateVoterEmailTokenController,
    registerVoterVoteController,
} from '../controllers/concurso/index.js';

const router = express.Router();

// Endpoint para inscribir un proyecto al concurso
router.post(
    '/concurso/inscripcion/:idGrupo',
    authUser,
    userExists,
    checkIfGroup,
    grupoExists,
    canEditGrupo,
    createNewContestInscriptionController
);

// Endpoint para traer la información de un proyecto inscrito al concurso
router.get(
    '/concurso/inscripcion/:idGrupo',
    authUser,
    userExists,
    checkIfGroup,
    grupoExists,
    canEditGrupo,
    getInfoInscriptionController
);

// Endpoint para que el admin pueda listar todos los proyectos inscritos al concurso
router.get(
    '/concurso/listado-inscripciones?',
    authUser,
    userExists,
    isAdmin,
    listadoInscripcionesController
);

// Endpoint para desincribirse del concurso
router.patch(
    '/concurso/unsubscribe/:idGrupo',
    authUser,
    userExists,
    checkIfGroup,
    grupoExists,
    canEditGrupo,
    unsubscribeContestInscriptionController
);

// Endpoint para active una inscripción del concurso
router.patch(
    '/concurso/subscribe/:idGrupo',
    authUser,
    userExists,
    isAdmin,
    grupoExists,
    subscribeContestInscriptionController
);

// Endpoint para listar los proyectos inscritos y aceptados al concurso
router.get('/concurso/contest-list?', listContestInscriptionsController);

// Endpoint para enviar codigo de verficacion al email del votante
router.post('/concurso/vote/verification-code', registerVoterEmailController);

//Endpoint para validar el token de verificación del votante
router.get(
    '/concurso/validate_email/:verification_token',
    validateVoterEmailTokenController
);
//Endpoint para validar el token de verificación del votante si no se pasa por params
router.post('/concurso/validate_email', validateVoterEmailTokenController);

// Endpoint para registrar un voto con el email del votante
router.post('/concurso/vote/:idProyecto', registerVoterVoteController);

// Permitir al admin elimiar los votos de un usuario

export default router;
