// Importamos los modelos.
import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditGrupo = async (req, res, next) => {
    try {
        const pool = await getPool();
        // Obtenemos el id del grupo a actualizar.
        const { idGrupo } = req.params;

        // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
        // no existe, obtenemos el id de los path params.
        const userId = req.params.user_id || req.user?.id;

        const [grupoOwner] = await pool.query(
            `SELECT usuario_id FROM grupos WHERE id = ?`,
            [idGrupo]
        );

        // Si no somos los propietarios lanzamos un error.
        if (grupoOwner[0].usuario_id !== userId)
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

export default canEditGrupo;
