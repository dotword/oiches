import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaService = async (id) => {
  console.log(id);
  try {
    const pool = await getPool();

  
    const [salaResults] = await pool.query('SELECT id FROM salas WHERE usuario_id = ?', [id]);
    if (salaResults.length === 0) {
      throw generateErrorsUtil('No se han encontrado salas para el usuario con el que estás logueado.', 400);
    }


    const salasId = salaResults.map(sala => sala.id);


    const [reservas] = await pool.query('SELECT * FROM reservas WHERE sala_id IN (?)', [salasId]);
    if (reservas.length === 0) {
      throw generateErrorsUtil('No se han encontrado reservas para este sala.', 400);
    }

    return  reservas ;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
