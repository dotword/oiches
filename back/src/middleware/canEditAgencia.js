// Importamos los modelos.
import canEditAgenciaService from '../services/middleware/canEditAgenciaService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditAgencia = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
        const { idAgencia } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.usuario_id || req.user.id;

        await canEditAgenciaService(idAgencia, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditAgencia;
