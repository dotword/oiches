import getPool from '../../database/getPool.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET } from '../../../env.js';
export const cancelarReservaService = async (token, reserva_id) => {
    try {
      const {sala_id:id}=reserva_id
        const pool = await getPool();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        const [grupoResults] = await pool.query(
            'SELECT id FROM Grupos WHERE usuario_id = ?',
            [usuario_id]
        );
        if (grupoResults.length === 0) {
            throw {
                status: 404,
                message:
                    'No se han encontrado grupos con el usuario con el que esta intentado acceder.',
            };
        }

        const [reservaResults] = await pool.query(
            'SELECT * FROM reservas WHERE id = ?',
            [id]
        );
        

        if (reservaResults.length === 0) {
            throw {
                status: 400,
                message: 'No existe ninguna reserva con la id proporcionada.',
            };
        }
        if (reservaResults[0].confirmada === 1) {
            throw {
                message:
                    'La reserva esta confirmada, no puede cancelar una reserva confirmada.',
            };
        }
        

        await pool.query('DELETE FROM Reservas WHERE id = ?', [id]);
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
