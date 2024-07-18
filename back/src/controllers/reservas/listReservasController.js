import { listReservaService } from '../../services/reservas/listReservasServices.js';

export const listReservaController = async (req, res, next) => {
    try {
        const {id} =req.user
        const reservas = await listReservaService(id);
        return res.status(200).json({
            reservas,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
