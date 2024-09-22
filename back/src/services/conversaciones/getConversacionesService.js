import getPool from "../../database/getPool.js";


const getConversacionesService = async (id) => {
  try {
    const pool = await getPool();
    if (!id) {
      throw new Error("Falta usuario");
    }
    const [conversaciones] = await pool.query(
      `SELECT * FROM conversaciones WHERE usuario1 = ? OR usuario2 = ?`, [id, id]
    );
      return conversaciones
  } catch (error) {
    throw new Error("Error al obtener conversaciones");
  }
}
export default getConversacionesService;