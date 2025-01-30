import publishGrupoService from '../../services/admin/publishGrupoService.js';

const publishGrupoController = async (req, res, next) => {
    try {
        const { grupoId } = req.params;

        await publishGrupoService(grupoId);

        res.send({
            status: 'ok',
            message: 'Grupo publicado con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export default publishGrupoController;
