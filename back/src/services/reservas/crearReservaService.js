import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const crearReservaService = async (
    fecha,
    horaInicio,
    horaFin,
    id,
    sala_id
) => {
    try {
        const pool = await getPool();

        // Generamos el id de la entrada.
        const reservaId = uuid();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const reservaFecha = new Date(fecha);
        reservaFecha.setHours(0, 0, 0, 0);

        if (reservaFecha < today) {
            throw generateErrorsUtil(
                'No se puede reservar una fecha anterior a hoy.',
                404
            );
        }

        const [grupoResults] = await pool.query(
            'SELECT id FROM grupos WHERE usuario_id = ?',
            [id]
        );
        const grupo_id = grupoResults[0].id;

        const [salaResults] = await pool.query(
            'SELECT id FROM salas WHERE id = ?',
            [sala_id]
        );
        await pool.query(
            'INSERT INTO reservas(id, fecha, horaInicio, horaFin, sala_id, grupo_id) VALUES (?, ?, ?, ?, ?, ?)',
            [reservaId, fecha, horaInicio, horaFin, sala_id, grupo_id]
        );

        const [reservaResults] = await pool.query(
            'SELECT * FROM reservas WHERE confirmada =? AND sala_id = ?',
            [1, sala_id]
        );
        reservaResults.forEach((result) => {
            if (fecha === result.fecha && horaInicio === result.horaInicio) {
                throw generateErrorsUtil(
                    'Ya hay una reserva para esta fecha y hora.',
                    402
                );
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
