import getPool from '../../database/getPool.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET } from '../../../env.js';
const aprobarReservaService = async (token, reserva_id) => {
    try {
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
        const grupo_id = grupoResults[0].id;

        const [reservaResults] = await pool.query(
            'SELECT * FROM Reservas WHERE grupo_id = ? AND sala_id = ?',
            [grupo_id, sala_id]
        );
        if (reservaResults.length === 0) {
            throw {
                status: 400,
                message: 'No existe ninguna reserva con la id proporcionada.',
            };
        }
        const reserva_id = reservaResults[0].id;
        await pool.query('DELETE FROM Reservas WHERE id = ?', [reserva_id]);
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

export default aprobarReservaService;
