// Importamos los modelos.
import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditSala = async (req, res, next) => {
    try {
        const pool = await getPool();
        // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
        const { idSala } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.usuario_id || req.user?.id;

        const [salaOwner] = await pool.query(
            `SELECT usuario_id FROM salas WHERE id = ?`,
            [idSala]
        );

        // Si no somos los propietarios lanzamos un error.
        if (salaOwner[0].usuario_id !== userId)
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

export default canEditSala;
