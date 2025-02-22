import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaGroupsService = async (group_id, userInfo) => {
    try {
        const pool = await getPool();

        // Fetch groups for the given user ID
        const [grupoResults] = await pool.query(
            'SELECT nombre FROM grupos WHERE usuario_id = ? AND id = ?',
            [userInfo[0].id, group_id]
        );

        if (grupoResults.length === 0 && userInfo[0].roles !== 'admin') {
            throw generateErrorsUtil(
                'No se han encontrado grupos para el usuario con el que estás logueado.',
                400
            );
        }

        // Fetch reservations along with group names
        const [reservas] = await pool.query(
            `SELECT reservas.*, grupos.nombre AS grupo_nombre, salas.id AS sala_id, salas.nombre AS sala_nombre, usuarios.email
                FROM reservas
                LEFT JOIN grupos ON reservas.grupo_id = grupos.id
                LEFT JOIN salas ON reservas.sala_id = salas.id
                LEFT JOIN usuarios ON salas.usuario_id = usuarios.id
                WHERE reservas.grupo_id IN (?)
                ORDER BY createdAt DESC`,
            [group_id]
        );

        return reservas;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
