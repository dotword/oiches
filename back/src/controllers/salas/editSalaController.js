import editSalaService from '../../services/salas/editSalaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editSalaSchema from '../../schemas/salas/editSalaSchema.js';
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
            ciudad,
            condiciones,
            equipamiento,
            web,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(editSalaSchema, Object.assign(req.body));

        if (Object.keys(req.body).length === 0)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        if (capacidad !== undefined) updatedFields.capacidad = capacidad;
        if (descripcion !== undefined) updatedFields.descripcion = descripcion;
        if (precios !== undefined) updatedFields.precios = precios;
        if (direccion !== undefined) updatedFields.direccion = direccion;
        if (ciudad !== undefined) updatedFields.ciudad = ciudad;
        if (condiciones !== undefined) updatedFields.condiciones = condiciones;
        if (equipamiento !== undefined)
            updatedFields.equipamiento = equipamiento;
        if (web !== undefined) updatedFields.web = web;
        if (generos !== undefined) updatedFields.generos = generos;

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
