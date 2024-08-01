import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditReservaService = async (reserva_id, userId) => {
    const pool = await getPool();

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
    console.log('salaO ', salaOwner);
    // Si no somos los propietarios lanzamos un error.
    if (salaOwner[0].id !== salaId[0].sala_id)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );
};

export default canEditReservaService;
