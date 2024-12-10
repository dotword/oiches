import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createSalaSchema from '../../schemas/salas/createSalaSchema.js';
import insertSalaService from '../../services/salas/insertSalaService.js';
import { insertSalaGenerosService } from '../../services/salas/insertSalaGenerosService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createSalaController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const adminUser = await selectUserByIdService(req.user.id);

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
        await validateSchemaUtil(
            createSalaSchema,
            Object.assign(req.body, req.files)
        );

        if (req.user.id !== userId && adminUser[0].roles !== 'admin')
            throw generateErrorsUtil('No puedes crear este proyecto', 400);

        const salaId = await insertSalaService(
            nombre,
            provincia,
            capacidad,
            descripcion,
            precios,
            direccion,
            ciudad,
            condiciones,
            equipamiento,
            web,
            userId
        );

        // Insertamos los géneros
        const generosList = [];
        if (generos) {
            const generosArray = Array.isArray(generos)
                ? generos
                : generos.split(',');

            for (const genero of generosArray) {
                await insertSalaGenerosService(genero.trim(), salaId);
                generosList.push({ generoId: genero.trim() });
            }
        }

        res.send({
            status: 'ok',
            data: {
                sala: {
                    id: salaId,
                    usuario_id: userId,
                    generos: generosList,
                    nombre,
                    provincia,
                    capacidad,
                    descripcion,
                    precios,
                    direccion,
                    ciudad,
                    condiciones,
                    equipamiento,
                    web,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createSalaController;
