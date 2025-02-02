import editAgenciaService from '../../services/agencias/editAgenciaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editAgenciaSchema from '../../schemas/agencias/editAgenciaSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const editAgenciaController = async (req, res, next) => {
    try {
        const { idAgencia } = req.params;

        const { nombre, provincia, descripcion, web } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(editAgenciaSchema, Object.assign(req.body));

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (descripcion !== undefined) updatedFields.descripcion = descripcion;
        if (web !== undefined) updatedFields.web = web;

        await editAgenciaService(idAgencia, updatedFields);

        res.send({
            status: 'ok',
            message: 'Agencia actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editAgenciaController;
