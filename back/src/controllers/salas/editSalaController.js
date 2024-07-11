import editSalaService from '../../services/salas/editSalaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditSalaSchema from '../../schemas/salas/createEditSalaSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const editSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        const {
            nombre,
            provincia,
            generos,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(createEditSalaSchema, Object.assign(req.body));

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (capacidad !== undefined) updatedFields.capacidad = capacidad;
        if (descripcion !== undefined) updatedFields.descripcion = descripcion;
        if (precios !== undefined) updatedFields.precios = precios;
        if (direccion !== undefined) updatedFields.direccion = direccion;
        if (condiciones !== undefined) updatedFields.condiciones = condiciones;
        if (equipamiento !== undefined)
            updatedFields.equipamiento = equipamiento;
        if (email !== undefined) updatedFields.email = email;
        if (generos !== undefined) updatedFields.generos = generos;

        if (Object.keys(updatedFields).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        await editSalaService(idSala, updatedFields);

        res.send({
            status: 'ok',
            message: 'Sala actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editSalaController;
