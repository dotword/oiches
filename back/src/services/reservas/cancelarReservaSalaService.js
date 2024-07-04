import getPool from '../../database/getPool.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET } from '../../../env.js';

const cancelarReservaSalaService = async (token, reserva_id) => {
    try {
        const pool = await getPool();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        // Traer el id de la sala
        const [idSala] = await pool.query(
            'SELECT sala_id FROM reservas WHERE id = ?',
            [reserva_id]
        );
        const sala_id = idSala[0].sala_id;

        console.log('sala ' + sala_id);
        console.log('reserva: ' + reserva_id);
        console.log('usuario logeado ' + usuario_id);

        // Verificar que la sala le corresponde al usuario
        const [userIdSala] = await pool.query(
            'SELECT id FROM salas WHERE usuario_id = ?',
            [usuario_id]
        );
        const id_salaReserva = userIdSala[0].id;

        console.log('id de sala en reserva ' + id_salaReserva);

        // const [grupoResults] = await pool.query(
        //     'SELECT id FROM Salas WHERE usuario_id = ?',
        //     [usuario_id]
        // );
        // if (grupoResults.length === 0) {
        //     throw {
        //         status: 404,
        //         message:
        //             'No se han encontrado grupos con el usuario con el que esta intentado acceder.',
        //     };
        // }
        // const grupo_id = grupoResults[0].id;

        // const [reservaResults] = await pool.query(
        //     'SELECT * FROM Reservas WHERE grupo_id = ? AND sala_id = ?',
        //     [grupo_id, sala_id]
        // );
        // console.log(reservaResults);
        // if (reservaResults[0].confirmada === 1) {
        //     throw {
        //         message:
        //             'La reserva esta confirmada, no puede cancelar una reserva confirmada.',
        //     };
        // }

        // const reserva_id = reservaResults[0].id;

        // await pool.query('DELETE FROM Reservas WHERE id = ?', [reserva_id]);

        // return {
        //     reserva: {
        //         grupoResults,
        //         reservaResults,
        //     },
        // };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default cancelarReservaSalaService;
