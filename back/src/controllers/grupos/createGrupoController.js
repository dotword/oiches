import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createGrupoSchema from '../../schemas/grupos/createGrupoSchema.js';
import insertGrupoService from '../../services/grupos/insertGrupoService.js';
import { insertGrupoGenerosService } from '../../services/grupos/insertGrupoGenerosService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createGrupoController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const adminUser = await selectUserByIdService(req.user.id);

        let published = '';
        if (adminUser[0].roles === 'agencia') {
            published = 1;
        } else {
            published = 0;
        }

        const {
            nombre,
            provincia,
            web,
            generos,
            honorarios,
            honorarios_to,
            condiciones,
            biografia,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(
            createGrupoSchema,
            Object.assign(req.body, req.files || {})
        );

        if (req.user.id !== userId && adminUser[0].roles !== 'admin')
            throw generateErrorsUtil('No puedes crear este proyecto', 400);

        const grupoId = await insertGrupoService(
            nombre,
            provincia,
            web,
            honorarios,
            honorarios_to,
            condiciones,
            biografia,
            published,
            userId
        );

        // Insertamos los géneros
        const generosList = [];
        if (generos) {
            const generosArray = Array.isArray(generos)
                ? generos
                : generos.split(',');

            for (const genero of generosArray) {
                await insertGrupoGenerosService(genero.trim(), grupoId);
                generosList.push({ generoId: genero.trim() });
            }
        }

        res.send({
            status: 'ok',
            data: {
                grupo: {
                    id: grupoId,
                    userId,
                    generos: generosList,
                    nombre,
                    provincia,
                    web,
                    honorarios,
                    honorarios_to,
                    condiciones,
                    biografia,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createGrupoController;
