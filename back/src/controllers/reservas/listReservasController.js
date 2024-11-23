import { listReservaService } from '../../services/reservas/listReservasServices.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

export const listReservaController = async (req, res, next) => {
    try {
        const { sala_id } = req.params;

        const adminUser = await selectUserByIdService(req.user.id);

        const reservas = await listReservaService(sala_id, adminUser);
        return res.status(200).json({
            reservas,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
