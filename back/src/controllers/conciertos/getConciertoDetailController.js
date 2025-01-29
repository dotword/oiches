import selectConciertoByIdService from '../../services/conciertos/selectConciertoByIdService.js';

const getConciertoDetailController = async (req, res, next) => {
    try {
        const { conciertoId } = req.params;

        const concierto = await selectConciertoByIdService(conciertoId);

        res.send({
            status: 'ok',
            concierto,
        });
    } catch (error) {
        next(error);
    }
};

export default getConciertoDetailController;
