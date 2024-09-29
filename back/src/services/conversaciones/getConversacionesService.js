import getPool from "../../database/getPool.js";

const getConversacionesService = async (id) => {
  try {
    const pool = await getPool();

    if (!id) {
      throw new Error("Falta usuario");
    }

    // Modificamos la consulta para obtener la información de ambos usuarios (usuario1 y usuario2)
    const [conversaciones] = await pool.query(
      `SELECT 
        c.id AS conversacion_id, 
        c.usuario1, 
        c.usuario2,
        
        u1.id AS usuario1_id,
        u1.username AS usuario1_username,
        u1.email AS usuario1_email,
        u1.roles AS usuario1_roles,
        u1.active AS usuario1_active,
        u1.avatar AS usuario1_avatar,

        u2.id AS usuario2_id,
        u2.username AS usuario2_username,
        u2.email AS usuario2_email,
        u2.roles AS usuario2_roles,
        u2.active AS usuario2_active,
        u2.avatar AS usuario2_avatar
        
      FROM conversaciones c
      LEFT JOIN usuarios u1 ON c.usuario1 = u1.id
      LEFT JOIN usuarios u2 ON c.usuario2 = u2.id
      WHERE c.usuario1 = ? OR c.usuario2 = ?`,
      [id, id]
    );

    // No necesitas una consulta adicional para los usuarios porque ya los obtienes en la consulta anterior.
    return {
      conversaciones,
    };
  } catch (error) {
    console.error("Error al obtener conversaciones:", error);
    throw new Error("Error al obtener conversaciones");
  }
};

export default getConversacionesService;
