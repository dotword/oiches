import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditUser = async (req, res, next) => {
    try {
        // Intentamos obtener el id de usuario de los path params.
        const { userId } = req.params;

        if (req.user.id !== userId)
            throw generateErrorsUtil(
                'El usuario no está autorizado para hacer esta operación',
                409
            );

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditUser;