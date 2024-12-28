import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const deleteFechasDisponiblesSalaService = async (idSala, fechaDisponible) => {
    const pool = await getPool();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fechaFormato = formatDate(new Date(fechaDisponible));

    const [result] = await pool.query(
        'DELETE FROM fechas_disponibles WHERE fecha_disponible = ? AND sala_id = ?',
        [fechaFormato, idSala]
    );

    if (result.affectedRows === 0)
        throw generateErrorsUtil(
            'No se encontró la fecha para la sala especificada.',
            400
        );

    return { idSala };
};

export default deleteFechasDisponiblesSalaService;
