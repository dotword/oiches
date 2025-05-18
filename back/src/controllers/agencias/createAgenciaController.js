import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createAgenciaSchema from '../../schemas/agencias/createAgenciaSchema.js';
import insertAgenciaService from '../../services/agencias/insertAgenciaService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createAgenciaController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const adminUser = await selectUserByIdService(req.user.id);

        if (req.user.id !== userId && adminUser[0].roles !== 'admin')
            throw generateErrorsUtil('No puedes crear este proyecto', 400);

        let { nombre, provincia, descripcion, web, especialidad } = req.body;

        // Si especialidad es un string con comas, lo convertimos en un array
        if (typeof especialidad === 'string') {
            especialidad = especialidad.split(',').map((e) => Number(e.trim()));
        }

        // Si especialidad es un número, lo convertimos en un array
        if (typeof especialidad === 'number') {
            especialidad = [especialidad];
        }

        // Si especialidad ya es un array, nos aseguramos de que todos sean números enteros
        if (Array.isArray(especialidad)) {
            especialidad = especialidad
                .map((e) => Number(e))
                .filter((e) => Number.isInteger(e));
        }

        // Validamos el body con Joi.
        await validateSchemaUtil(createAgenciaSchema, req.body);

        const agenciaId = await insertAgenciaService(
            userId,
            nombre,
            provincia,
            descripcion,
            web,
            especialidad
        );

        res.send({
            status: 'ok',
            data: {
                agencia: {
                    userId,
                    id: agenciaId,
                    nombre,
                    provincia,
                    descripcion,
                    web,
                    especialidad,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createAgenciaController;
