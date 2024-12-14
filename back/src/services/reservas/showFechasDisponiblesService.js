import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const showFechasDisponiblesService = async (idSala) => {
    const pool = await getPool();

    const [sala] = await pool.query(
        'SELECT calendarActive FROM salas WHERE id = ?',
        [idSala]
    );

    const [fechas] = await pool.query(
        'SELECT fecha_disponible FROM fechas_disponibles WHERE sala_id = ?',
        [idSala]
    );

    if (sala.length === 0) throw generateErrorsUtil('Sala no encontrada', 404);

    const fechasDisponibles = fechas.map((row) => row.fecha_disponible);

    return {
        fechasDisponibles,
        calendarActive: Boolean(sala[0].calendarActive),
    };
};

export default showFechasDisponiblesService;
