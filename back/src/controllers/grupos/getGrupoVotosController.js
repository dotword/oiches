import selectGruposVotosService from '../../services/grupos/selectGruposVotosService.js';

const getGrupoVotosController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;
        console.log('controlleId ', idGrupo);

        const grupoVotos = await selectGruposVotosService(
            idGrupo,
            req.user?.id
        );

        res.send({
            status: 'ok',
            data: {
                grupoVotos,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getGrupoVotosController;
