import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';

const getGrupoDetailController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;
        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.sala".
        const grupo = await selectGrupoByIdService(idGrupo, req.user?.id);
        console.log(grupo);

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
