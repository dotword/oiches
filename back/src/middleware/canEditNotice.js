import canEditNoticeService from '../services/middleware/canEditNoticeService.js';

const canEditNotice = async (req, res, next) => {
    try {
        const { idNotice } = req.params;
        // Intentamos obtener el id de usuario de la propiedad "user". Si no existe, obtenemos el id de los path params.
        const userId = req.params.usuario_id || req.user.id;

        await canEditNoticeService(idNotice, userId);

        next();
    } catch (error) {
        next(error);
    }
};

export default canEditNotice;
