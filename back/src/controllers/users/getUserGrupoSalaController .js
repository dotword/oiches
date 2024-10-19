import getUserGrupoSalaService from '../../services/users/getUserGrupoSalaService.js';

const getUserGrupoSalaController = async (req, res, next) => {
    try {
        const { name } = req.params;
        const user = await getUserGrupoSalaService(name);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export default getUserGrupoSalaController;
