import deleteSalaService from '../../services/admin/deleteSalaService.js';
const deleteSalaController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        await deleteSalaService(userId);

        res.status(200).json({
            message: 'El usuario se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteSalaController;
