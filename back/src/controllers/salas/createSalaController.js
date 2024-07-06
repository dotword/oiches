import insertSalaService from '../../services/salas/insertSalaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';

const createSalaController = async (req, res, next) => {
    try {
        const {
            nombre,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(createSalaSchema, req.body);

        const { id } = req.user;

        const salaId = await insertSalaService(
            id,
            nombre,
            capacidad,
            descripcion,
            precios,
            direccion,
            condiciones,
            equipamiento,
            email
        );

        res.send({
            satus: 'ok',
            data: {
                sala: {
                    id: salaId,
                    usuario_id: req.user.id,
                    nombre,
                    capacidad,
                    descripcion,
                    precios,
                    direccion,
                    condiciones,
                    equipamiento,
                    email,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createSalaController;
