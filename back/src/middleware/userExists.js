// Importamos las dependencias.
import userExistsService from '../services/middleware/userExistsService.js';

// Función controladora intermedia que lanza un error si no existe un usuario con un id dado.
const userExists = async (req, res, next) => {
    try {
        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.userId || req.user.id;

        await userExistsService(userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default userExists;
