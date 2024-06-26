import getPool from "../../database/getPool.js";
import { JWT_SECRET } from "../../../env.js";
import pkg from 'jsonwebtoken'
export const crearReservaService = async (fecha,hora,nombre,token,sala_id) =>{
  try {
    const pool = await getPool();
   
    const decoded = pkg.verify(token, JWT_SECRET);
    const { id: usuario_id } = decoded;

  
    const [grupoResults] = await pool.query('SELECT id FROM Grupos WHERE usuario_id = ?', [usuario_id]);
    const grupo_id = grupoResults[0].id;

    const [salaResults] = await pool.query('SELECT id FROM Salas WHERE id = ?', [sala_id]);
    await pool.query('INSERT INTO Reservas(nombre, fecha, hora, sala_id, grupo_id) VALUES (?, ?, ?, ?, ?)', [nombre, fecha, hora, sala_id, grupo_id]);

    return {
      message: 'Reserva realizada con éxito',
      reserva: {
        nombre,
        fecha,
        hora,
        sala_id,
        grupo_id,
        salaResults,
        grupoResults
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}