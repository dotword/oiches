import publishSalaService from '../../services/admin/publishSalaService.js';

const publishSalaController = async (req, res, next) => {
    try {
        const { salaId } = req.params;

        await publishSalaService(salaId);

        res.send({
            status: 'ok',
            message: 'Sala publicada con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export default publishSalaController;
