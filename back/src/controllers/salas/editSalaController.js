import editSalaService from '../../services/salas/editSalaService.js';
import insertSalaGeneroService from '../../services/salas/insertSalaGeneroService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditSalaSchema from '../../schemas/salas/createEditSalaSchema.js';

const editSalaController = async (req, res, next) => {
    try {
        const { idSala } = req.params;
        // const salaId = idSala;
        const {
            nombre,
            provincia,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        // Validamos el body con Joi.
        // await validateSchemaUtil(
        //     createEditSalaSchema,
        //     Object.assign(req.body, req.files)
        // );

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
        // if (genero !== undefined) updatedFields.genero = genero;

        if (updatedFields) await editSalaService(idSala, updatedFields);
        // if (req.body.genero) {
        //     await insertSalaGeneroService(
        //         Object.values(req.body.genero),
        //         salaId
        //     );
        // }

        res.send({
            status: 'ok',
            data: {
                idSala,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default editSalaController;
