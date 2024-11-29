import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaService = async (sala_id, adminUser) => {
    try {
        const pool = await getPool();

        const [salaResults] = await pool.query(
            'SELECT id, nombre FROM salas WHERE usuario_id = ?',
            [sala_id]
        );
        if (salaResults.length === 0 && adminUser[0].roles !== 'admin') {
            throw generateErrorsUtil(
                'No se han encontrado salas para el usuario con el que estás logueado.',
                400
            );
        }

        const salasId = salaResults.map((sala) => sala.id);

        const [reservas] = await pool.query(
            `SELECT reservas.*, grupos.nombre AS grupo_nombre, grupos.usuario_id AS sala_id, salas.nombre AS sala_nombre, usuarios.email
                FROM reservas
                LEFT JOIN grupos ON reservas.grupo_id = grupos.id
                LEFT JOIN salas ON reservas.sala_id = salas.id
                LEFT JOIN usuarios ON grupos.usuario_id = usuarios.id
                WHERE reservas.sala_id IN (?)
                ORDER BY createdAt DESC`,
            [salasId]
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
