import resetAdvertClicksService from '../../services/advertisers/resetAdvertClicksService.js';

const resetAdvertClicksController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;

        await resetAdvertClicksService(idAdvert);

        res.status(200).json({
            message: 'Las estadísticas se han reseteado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default resetAdvertClicksController;
