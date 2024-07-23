// Importamos los modelos.
import canEditSalaService from '../services/middleware/canEditSalaService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditSala = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
        const { idSala } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.usuario_id || req.user.id;

        await canEditSalaService(idSala, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditSala;
