import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';

const fechasDisponiblesSalaService = async (idSala, fechaDisponible) => {
    const pool = await getPool();

    const valores = fechaDisponible.map((fecha) => [
        uuid(), // Generar un ID único para cada fecha
        idSala,
        fecha,
    ]);

    await pool.query(
        'INSERT INTO fechas_disponibles (id, sala_id, fecha_disponible) VALUES ?',
        [valores]
    );

    return { idSala, fechaDisponible };
};

export default fechasDisponiblesSalaService;
