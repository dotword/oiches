// Importamos los modelos.
import canEditGrupoService from '../services/middleware/canEditGrupoService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditGrupo = async (req, res, next) => {
    try {
        // Obtenemos el id del grupo a actualizar.
        const { idGrupo } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.user_id || req.user?.id;

        await canEditGrupoService(idGrupo, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditGrupo;
