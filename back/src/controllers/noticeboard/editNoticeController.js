import editNoticeService from '../../services/noticeboard/editNoticeService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import Joi from 'joi';
import joiErrorMessages from '../../schemas/joiErrorMessages.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const editNoticeController = async (req, res, next) => {
    try {
        const { idNotice } = req.params;

        const { provincia, titulo, descripcion } = req.body;

        // Validamos el body con Joi

        await validateSchemaUtil(
            Joi.object({
                provincia: Joi.number()
                    .optional()
                    .max(50)
                    .messages(joiErrorMessages),
                titulo: Joi.string()
                    .max(200)
                    .allow('')
                    .messages(joiErrorMessages),
                descripcion: Joi.string()
                    .max(2000)
                    .allow('')
                    .messages(joiErrorMessages),
            }),
            req.body
        );

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (titulo !== undefined) updatedFields.titulo = titulo;
        if (descripcion !== undefined) updatedFields.descripcion = descripcion;

        await editNoticeService(idNotice, updatedFields);

        res.send({
            status: 'ok',
            message: 'Anuncio actualizado',
        });
    } catch (error) {
        next(error);
    }
};

export default editNoticeController;
