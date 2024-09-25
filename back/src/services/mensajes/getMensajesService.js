import getPool from "../../database/getPool.js";


const getMensajesService = async (id,idConversacion) => {
  try {
    
     const pool = await getPool();
     if(!id){
      throw new Error("Falta usuario");
     }
      if(!idConversacion){
        throw new Error("Falta conversacion");
      }
      const [result] = await pool.query(
        `SELECT * FROM mensajes WHERE (usuario = ? OR destinatario = ?) AND conversacion = ?`,
        [id, id, idConversacion]
      );
    return result;
  } catch (error) {
    throw new Error("Error al obtener mensajes");
  }
}
export default getMensajesService;