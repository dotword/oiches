import listOldConciertosService from '../../services/conciertos/listOldConciertosService.js';

const listOldConciertosController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 12;

        const conciertos = await listOldConciertosService(page, pageSize);

        res.status(200).send(conciertos);
    } catch (error) {
        next(error);
    }
};

export default listOldConciertosController;
