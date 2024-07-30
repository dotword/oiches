
import {listReservaGroupsService} from '../../services/reservas/listReservaGroupsService.js'
export const listReservaGroups = async (req, res, next) => {
    try {
        const {id} =req.user
        const reservas = await listReservaGroupsService(id);
        return res.status(200).json({
            reservas,   
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
