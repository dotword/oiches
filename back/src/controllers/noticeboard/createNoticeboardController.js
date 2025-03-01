import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createNoticeboardSchema from '../../schemas/noticeboard/createNoticeboardSchema.js';
import createNoticeboardService from '../../services/noticeboard/createNoticeboardService.js';

const createNoticeboardController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { salaGrupo_id, category_id, provincia, titulo, descripcion } =
            req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(createNoticeboardSchema, req.body);

        const noticeboardId = await createNoticeboardService(
            userId,
            salaGrupo_id,
            category_id,
            provincia,
            titulo,
            descripcion
        );

        res.send({
            status: 'ok',
            notice: {
                id: noticeboardId,
                userId,
                salaGrupo_id,
                category_id,
                provincia,
                titulo,
                descripcion,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        next(error);
    }
};

export default createNoticeboardController;
