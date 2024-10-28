import editGrupoController from './editGrupoController.js';
import getGrupoDetailController from './getGrupoDetailController.js';
import createGrupoController from './createGrupoController.js';
import listGruposController from './listGruposController.js';
import voteGrupoController from './voteGrupoController.js';
import {
    deleteGrupoMediaController,
    addGrupoMediaController,
} from './grupoMediaController.js';
import {
    deleteGrupoGeneroController,
    addGrupoGeneroController,
} from './grupoGeneroController.js';
import {
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    setMainPhotoController,
} from './grupoFilesController.js';
import getGrupoVotosController from './getGrupoVotosController.js';
import { deleteGrupoController } from './deleteGrupoController.js';

export {
    editGrupoController,
    getGrupoDetailController,
    createGrupoController,
    voteGrupoController,
    listGruposController,
    deleteGrupoMediaController,
    addGrupoMediaController,
    deleteFileGrupoController,
    addPdfGrupoController,
    addPhotosGrupoController,
    getGrupoVotosController,
    deleteGrupoGeneroController,
    addGrupoGeneroController,
    deleteGrupoController,
    setMainPhotoController,
};
