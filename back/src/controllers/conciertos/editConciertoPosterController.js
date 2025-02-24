import selectConciertoByIdService from '../../services/conciertos/selectConciertoByIdService.js';
import updateConciertoPosterService from '../../services/conciertos/updateConciertoPosterService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editPosterSchema from '../../schemas/conciertos/editPosterSchema.js';

import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';

// Importamos el esquema.
const editConciertoPosterController = async (req, res, next) => {
    try {
        const { conciertoId } = req.params;

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacÃ­o.
        await validateSchemaUtil(editPosterSchema, req.files || {});

        // Obtenemos los datos del concierto para comprobar si ya tiene un poster previo.
        const concierto = await selectConciertoByIdService(conciertoId);

        // Si tiene un poster previo lo eliminamos.
        if (concierto.poster) {
            await deleteFiles(concierto.poster);
        }

        // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
        const posterName = await uploadFiles(req.files.poster);

        // Actualizamos los datos del concierto con el nombre del poster que hemos obtenido.
        await updateConciertoPosterService(posterName, conciertoId);

        res.send({
            status: 'ok',
            message: 'Poster actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default editConciertoPosterController;
