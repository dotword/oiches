// Importamos las dependencias.
import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que lanza un error si no existe un usuario con un id dado.
const userExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.user?.id || req.params.userId;

        const [users] = await pool.query(
            `SELECT id FROM usuarios WHERE id = ?`,
            [userId]
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1)
            throw generateErrorsUtil('El usuario no existe', 404);

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default userExists;
