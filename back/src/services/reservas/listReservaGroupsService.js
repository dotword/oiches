import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaGroupsService = async (id) => {
  try {
    const pool = await getPool();

    // Fetch groups for the given user ID
    const [grupoResults] = await pool.query('SELECT id, nombre FROM grupos WHERE usuario_id = ?', [id]);
    if (grupoResults.length === 0) {
      throw generateErrorsUtil('No se han encontrado grupos para el usuario con el que estás logueado.', 400);
    }

    const grupoIds = grupoResults.map(grupo => grupo.id);

    // Fetch reservations along with group names
    const [reservas] = await pool.query(
      `SELECT reservas.*, grupos.nombre AS grupo_nombre, salas.nombre AS sala_nombre
       FROM reservas
       LEFT JOIN grupos ON reservas.grupo_id = grupos.id
       LEFT JOIN salas ON reservas.sala_id = salas.id
       WHERE reservas.grupo_id IN (?)`,
      [grupoIds]
    );

    if (reservas.length === 0) {
      throw generateErrorsUtil('No se han encontrado reservas para este grupo.', 400);
    }

    return reservas;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
