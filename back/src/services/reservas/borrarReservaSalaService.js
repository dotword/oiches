import getPool from '../../database/getPool.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET } from '../../../env.js';

const borrarReservaSalaService = async (token, reserva_id) => {
    try {
        const pool = await getPool();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        // Traer el id de la sala
        const [idSala] = await pool.query(
            'SELECT sala_id, confirmada FROM reservas WHERE id = ?',
            [reserva_id]
        );

        // Comprobar que la reserva existe
        if (idSala.length === 0) {
            throw {
                status: 404,
                message: 'No se han encontrado la reserva que intentas borrar.',
            };
        }

        // Comprobar que la reserva no esté confirmada
        const reservaConfirm = idSala[0].confirmada;
        if (reservaConfirm === 1) {
            throw {
                message:
                    'La reserva esta confirmada, no puede cancelar una reserva confirmada.',
            };
        }
        const sala_id = idSala[0].sala_id;

        // Verificar que la sala le corresponde al usuario
        const [userIdSala] = await pool.query(
            'SELECT usuario_id FROM salas WHERE id = ?',
            [sala_id]
        );
        const idUser_salaReserva = userIdSala[0].usuario_id;

        if (idUser_salaReserva !== usuario_id) {
            throw {
                message: 'No tienes permiso para borrar está reserva.',
            };
        }

        await pool.query('DELETE FROM Reservas WHERE id = ?', [reserva_id]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarReservaSalaService;
