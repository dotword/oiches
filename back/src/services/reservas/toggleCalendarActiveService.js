import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const toggleCalendarActiveService = async (idSala, calendarActive) => {
    const pool = await getPool();

    // Actualizamos el estado de calendarActive en la tabla salas
    const [result] = await pool.query(
        'UPDATE salas SET calendarActive = ? WHERE id = ?',
        [calendarActive, idSala]
    );

    // Verificamos si se actualizó alguna fila
    if (result.affectedRows === 0)
        throw generateErrorsUtil(
            'No se pudo actualizar el estado del calendario.',
            400
        );
};

export default toggleCalendarActiveService;
