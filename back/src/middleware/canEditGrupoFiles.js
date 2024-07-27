// Importamos los modelos.
import canEditGrupoFilesService from '../services/middleware/canEditGrupoFilesService.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditGrupoFiles = async (req, res, next) => {
    try {
        // Obtenemos el id de la foto.
        const { deletePhoto } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.user.id;

        await canEditGrupoFilesService(deletePhoto, userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditGrupoFiles;
