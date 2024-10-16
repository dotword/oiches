import express from 'express';

// Importamos las funciones controladoras intermedias.
import {
    authUser,
    userExists,
    grupoExists,
    canEditGrupo,
    hasOneGroup,
    checkIfGroup,
    canEditGrupoFiles,
} from '../middleware/index.js';

// Importamos las funciones controladoras finales.
import {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    listGruposController,
    deleteGrupoMediaController,
    addGrupoMediaController,
    addGrupoGeneroController,
    deleteGrupoGeneroController,
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    deleteGrupoController,
} from '../controllers/grupos/index.js';
import  createConversacionController  from '../controllers/conversaciones/crearConversacionController.js';
import crearMensajeController from '../controllers/mensajes/crearMensajeController.js';
import getMensajesController from '../controllers/mensajes/getMensajesController.js';
import getConversacionesController from '../controllers/conversaciones/getConversacionesController.js';
const router = express.Router();

// Crear una conversacion

router.post(
    '/conversaciones',
    authUser,
    userExists,
    createConversacionController
);
router.post('/mensajes',authUser,crearMensajeController);
router.get('/mensajes/:idConversacion',authUser,getMensajesController);
router.get('/conversaciones',authUser,getConversacionesController);
export default router;