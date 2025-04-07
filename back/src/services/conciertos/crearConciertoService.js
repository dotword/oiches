import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const crearConciertoService = async (
    reservaId,
    fecha,
    hora,
    precio,
    description,
    link,
    salaLink,
    poster
) => {
    const pool = await getPool();

    // Crear el concierto
    const conciertoId = uuid();
    await pool.query(
        'INSERT INTO conciertos(id, reservaId, fecha, hora, precio, description, link, salaLink, poster ) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?)',
        [
            conciertoId,
            reservaId,
            fecha,
            hora,
            precio,
            description,
            link,
            salaLink,
            poster,
        ]
    );

    return {
        conciertoId,
        reservaId,
        fecha,
        hora,
        precio,
        description,
        link,
        salaLink,
        poster,
    };
};

export default crearConciertoService;
