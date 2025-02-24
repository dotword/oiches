import nextPrevGruposService from '../../services/grupos/nextPrevGruposService.js';

const nextPrevGrupoController = async (req, res, next) => {
    const { idGrupo } = req.params;
    try {
        const gruposNavigator = await nextPrevGruposService(idGrupo);

        res.status(200).send(gruposNavigator);
    } catch (error) {
        next(error);
    }
};

export default nextPrevGrupoController;
