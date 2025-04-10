import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const crearConciertoService = async (
    reservaId,
    title,
    fecha,
    hora,
    precioAnticipada,
    precio,
    otroTipoEntrada,
    description,
    link,
    salaLink,
    poster
) => {
    const pool = await getPool();

    // Convertimos campos vacíos a null si es necesario
    const anticipadaFinal = precioAnticipada === '' ? null : precioAnticipada;
    const precioFinal = precio === '' ? null : precio;

    // Crear el concierto
    const conciertoId = uuid();
    await pool.query(
        'INSERT INTO conciertos(id, reservaId, title, fecha, hora, precioAnticipada, precio, otroTipoEntrada, description, link, salaLink, poster ) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)',
        [
            conciertoId,
            reservaId,
            title,
            fecha,
            hora,
            anticipadaFinal,
            precioFinal,
            otroTipoEntrada,
            description,
            link,
            salaLink,
            poster,
        ]
    );

    return {
        conciertoId,
        reservaId,
        title,
        fecha,
        hora,
        precioAnticipada,
        precio,
        otroTipoEntrada,
        description,
        link,
        salaLink,
        poster,
    };
};

export default crearConciertoService;
