// Importamos los modelos.
import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar una sala.
const canEditReserva = async (req, res, next) => {
    try {
        const pool = await getPool();
        // Obtenemos el id de la reserva en la cuál tendra lugar el cambio.
        const { reserva_id } = req.params;
        const userId = req.params.usuario_id || req.user?.id;

        // Obtenemos el id de la sala
        const [salaId] = await pool.query(
            `SELECT sala_id FROM reservas WHERE id = ?`,
            [reserva_id]
        );

        // Si la reserva no existe lanzamos un error.
        if (salaId.length === 0)
            throw generateErrorsUtil('La reserva no existe', 409);

        // Comprobamos que la sala pertenece al usuario
        const [salaOwner] = await pool.query(
            `SELECT id FROM salas WHERE usuario_id = ?`,
            [userId]
        );

        // Si no somos los propietarios lanzamos un error.
        if (salaOwner[0].id !== salaId[0].sala_id)
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

export default canEditReserva;
