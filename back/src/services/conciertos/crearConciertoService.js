import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const crearConciertoService = async (
    reservaId,
    fecha,
    hora,
    precio,
    link,
    poster
) => {
    const pool = await getPool();

    // Verificar la reserva
    const [reservaResults] = await pool.query(
        'SELECT sala_id, confirmada FROM reservas WHERE id = ?',
        [reservaId]
    );

    if (!reservaResults.length)
        throw generateErrorsUtil(
            'La reserva para este concierto no existe',
            404
        );

    if (reservaResults[0].confirmada !== '1')
        throw generateErrorsUtil('La reserva no está confirmada', 404);

    // Comprobar que el concierto no esté creado
    const [concertResult] = await pool.query(
        'SELECT id FROM conciertos WHERE reservaId = ?',
        [reservaId]
    );

    if (concertResult.length > 0)
        throw generateErrorsUtil(
            'El concierto para esta reserva ya está publicado',
            404
        );

    // Crear el concierto
    const conciertoId = uuid();
    await pool.query(
        'INSERT INTO conciertos(id, reservaId, fecha, hora, precio, link, poster ) VALUES (?, ?, ?, ?, ? , ?, ?)',
        [conciertoId, reservaId, fecha, hora, precio, link, poster]
    );

    return { conciertoId, reservaId, fecha, hora, precio, link, poster };
};

export default crearConciertoService;
