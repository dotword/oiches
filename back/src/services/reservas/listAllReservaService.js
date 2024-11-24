import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const listAllReservaService = async () => {
    try {
        const pool = await getPool();

        const [reservas] = await pool.query(
            `SELECT reservas.*, grupos.nombre AS grupo_nombre, salas.nombre AS sala_nombre
                FROM reservas
                LEFT JOIN grupos ON reservas.grupo_id = grupos.id
                LEFT JOIN salas ON reservas.sala_id = salas.id
            `
        );
        if (reservas.length === 0) {
            throw generateErrorsUtil(
                'No se han encontrado reservas para este sala.',
                400
            );
        }

        return reservas;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listAllReservaService;
