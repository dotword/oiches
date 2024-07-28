import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaGroupsService = async (id) => {
  
  try {
    const pool = await getPool();

  
    const [grupoResults] = await pool.query('SELECT id FROM grupos WHERE usuario_id = ?', [id]);
    if (grupoResults.length === 0) {
      throw generateErrorsUtil('No se han encontrado grupos para el usuario con el que estás logueado.', 400);
    }


    const grupoIds = grupoResults.map(grupo => grupo.id);


    const [reservas] = await pool.query('SELECT * FROM reservas WHERE grupo_id IN (?)', [grupoIds]);
    if (reservas.length === 0) {
      throw generateErrorsUtil('No se han encontrado reservas para este grupo.', 400);
    }

    return  reservas ;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
