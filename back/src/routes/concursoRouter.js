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
// Endpoint para que el admin rechaze o acepte un proyecto ya admitido
// router.post(
//     '/concurso/inscripcion/:idGrupo/admision',
//     authUser,
//     isAdmin,
//     grupoExists,
//     canEditGrupo,
//     createNewContestInscriptionController
// );

export default router;
