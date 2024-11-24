import listAllReservaService from '../../services/reservas/listAllReservaService.js';

const listAllReservas = async (req, res, next) => {
    try {
        const reservas = await listAllReservaService();

        res.send({
            status: 'ok',
            data: {
                reservas,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listAllReservas;
