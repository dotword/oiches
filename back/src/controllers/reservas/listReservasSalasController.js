import { listReservasSalasService } from '../../services/reservas/listReservasSalasService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

export const listReservasSalasController = async (req, res, next) => {
    try {
        const { sala_id } = req.params;

        const userInfo = await selectUserByIdService(req.user.id);
        const reservas = await listReservasSalasService(sala_id, userInfo);

        return res.status(200).json({
            reservas,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
