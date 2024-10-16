import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';

const getGrupoDetailController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const grupo = await selectGrupoByIdService(idGrupo, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                grupo,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getGrupoDetailController;
