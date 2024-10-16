import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';
import insertSalaPhotoService from '../../services/salas/insertSalaPhotoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import uploadFiles from '../../utils/uploadFiles.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import addPdfSchema from '../../schemas/grupos/addPdfSchema.js';

export const addRiderController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        // Validamos el body con Joi para el rider (PDF).
        await validateSchemaUtil(addPdfSchema, Object.assign(req.files || {}));

        const sala = await selectSalaByIdService(idSala);

        if (!req.files || !req.files.rider) {
            throw generateErrorsUtil(
                'No se ha proporcionado ningún archivo PDF',
                400
            );
        }

        // // Comprobar que no hay otro PDF subido
        if (sala.pdf.length > 0) {
            throw generateErrorsUtil('Solo se puede subir un PDF', 400);
        }

        const rider = req.files.rider;

        // Guardamos el archivo y obtenemos su nombre.
        const riderName = await uploadFiles(rider);

        // Insertamos el rider en la tabla de fotos.
        await insertSalaPhotoService(riderName, idSala);

        res.send({
            status: 'ok',
            message: 'Rider subido con éxito',
        });
    } catch (error) {
        next(error);
    }
};
