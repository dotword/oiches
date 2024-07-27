import { deleteGrupoMediaService } from '../../services/grupos/insertGrupoMediaService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
import { insertGrupoMediaService } from '../../services/grupos/insertGrupoMediaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addGrupoMediaSchema from '../../schemas/grupos/addGrupoMediaSchema.js';

export const deleteGrupoMediaController = async (req, res, next) => {
    try {
        const { mediaDelete, idGrupo } = req.params;

        // Borrar media
        if (mediaDelete !== undefined) {
            await deleteGrupoMediaService(mediaDelete, idGrupo);
        }

        res.send({
            status: 'ok',
            message: 'Video borrado',
        });
    } catch (error) {
        next(error);
    }
};

export const addGrupoMediaController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;
        const { mediaName } = req.body;

        await validateSchemaUtil(addGrupoMediaSchema, Object.assign(req.body));

        const grupo = await selectGrupoByIdService(idGrupo);

        // Si el grupo tiene más de 4 enlaces lanzamos un error.
        if (mediaName !== undefined && grupo.media.length > 3)
            throw generateErrorsUtil(
                'No se pueden subir más de 4 enlaces al grupo',
                409
            );

        // Guardamos el enlace en DB.
        if (mediaName !== undefined && mediaName.length > 0) {
            await insertGrupoMediaService(mediaName, idGrupo);
        }
        res.send({
            status: 'ok',
            message: 'Video añadido',
        });
    } catch (error) {
        next(error);
    }
};
