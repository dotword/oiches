import getPool from '../../database/getPool.js';
import { JWT_SECRET } from '../../../env.js';
import pkg from 'jsonwebtoken';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const listReservaService = async (token) => {
  try {
    const pool = await getPool();

    // Verificar y decodificar el token
    const decoded = pkg.verify(token, JWT_SECRET);
    const { id: usuario_id } = decoded;

    // Obtener todas las salas asociadas al usuario
    const [salaResults] = await pool.query('SELECT id FROM salas WHERE usuario_id = ?', [usuario_id]);
    if (salaResults.length === 0) {
      throw generateErrorsUtil('No se han encontrado salas para el usuario con el que estás logueado.', 400);
    }

    // Extraer los IDs de las salas
    const salaIds = salaResults.map(sala => sala.id);

    // Obtener las reservas asociadas a las salas
    const [reservas] = await pool.query('SELECT * FROM reservas WHERE sala_id IN (?)', [salaIds]);
    if (reservas.length === 0) {
      throw generateErrorsUtil('No se han encontrado reservas para estas salas.', 400);
    }

    return  reservas ;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
