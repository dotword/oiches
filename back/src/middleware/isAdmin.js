import userIsAdminService from '../services/middleware/userIsAdminService.js';

// Función controladora intermedia que lanza un error si no existe un usuario con un id dado.
const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id || req.params;

        await userIsAdminService(userId);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default isAdmin;
