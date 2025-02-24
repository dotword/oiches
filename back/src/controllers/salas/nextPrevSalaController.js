import nextPrevSalasService from '../../services/salas/nextPrevSalasService.js';

const nextPrevSalaController = async (req, res, next) => {
    const { idSala } = req.params;
    try {
        const salasNavigator = await nextPrevSalasService(idSala);

        res.status(200).send(salasNavigator);
    } catch (error) {
        next(error);
    }
};

export default nextPrevSalaController;
