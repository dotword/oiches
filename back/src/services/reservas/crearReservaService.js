import getPool from '../../database/getPool.js';
import { JWT_SECRET } from '../../../env.js';
import pkg from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

export const crearReservaService = async (
    fecha,
    horaInicio,
    horaFin,
    token,
    sala_id
) => {
    try {
        const pool = await getPool();

        // Generamos el id de la entrada.
        const reservaId = uuid();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        const [grupoResults] = await pool.query(
            'SELECT id FROM Grupos WHERE usuario_id = ?',
            [usuario_id]
        );
        const grupo_id = grupoResults[0].id;

        const [salaResults] = await pool.query(
            'SELECT id FROM Salas WHERE id = ?',
            [sala_id]
        );
        await pool.query(
            'INSERT INTO Reservas(id, fecha, horaInicio,horaFin, sala_id, grupo_id) VALUES (?, ?, ?, ?, ?, ?)',
            [reservaId, fecha, horaInicio , horaFin, sala_id, grupo_id]
        );

        const [reservaResults] = await pool.query(
            'SELECT * FROM reservas WHERE confirmada =? AND sala_id = ?',
            [1, sala_id]
        );
        reservaResults.forEach((result) => {
            console.log(result);
            if (fecha === result.fecha && horaInicio === result.horaInicio) {
                throw {
                    message: 'Ya hay una reserva para esta fecha y hora.',
                };
            }
        });
        return {
            reserva: {
                fecha,
                horaInicio,
                horaFin,
                sala_id,
                grupo_id,
                salaResults,
                grupoResults,
            },
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
