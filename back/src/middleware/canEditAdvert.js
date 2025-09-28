import canEditAdvertService from '../services/middleware/canEditAdvertService.js';

const canEditAdvert = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;
        // Intentamos obtener el id de usuario de la propiedad "user". Si no existe, obtenemos el id de los path params.
        const userId = req.params.usuario_id || req.user.id;

        await canEditAdvertService(idAdvert, userId);

        next();
    } catch (error) {
        next(error);
    }
};

export default canEditAdvert;
