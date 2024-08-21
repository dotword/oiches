import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
export const cancelarReservaService = async (id, reserva_id) => {
    try {
        const pool = await getPool();

        const [grupoResults] = await pool.query(
            'SELECT id FROM grupos WHERE usuario_id = ?',
            [id]
        );
        if (grupoResults.length === 0) {
            throw generateErrorsUtil(
                'No se han encontrado grupos con el usuario con el que esta intentado acceder.',
                400
            );
        }

        const [reservaResults] = await pool.query(
            'SELECT * FROM reservas WHERE id = ?',
            [reserva_id]
        );

        if (reservaResults.length === 0) {
            throw generateErrorsUtil(
                'No existe ninguna reserva con la id proporcionada.',
                400
            );
        }
        if (reservaResults[0].confirmada === 1) {
            throw generateErrorsUtil(
                'La reserva esta confirmada, no puede cancelar una reserva confirmada.',
                400
            );
        }

        await pool.query('DELETE FROM reservas WHERE id = ?', [reserva_id]);
        return {
            reserva: {
                grupoResults,
                reservaResults,
            },
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
