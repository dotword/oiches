import getPool from "../../database/getPool.js";

export const deleteSalaService = async (salaId) => {
  const pool = await getPool();

  try {
    // Seleccionar el usuario

      // Seleccionar salas asociadas al usuario

   // Eliminar media de la sala
        await pool.query(`DELETE FROM sala_fotos WHERE salaId = ?`, [salaId]);

        // Seleccionar reservas de la sala
        const [reservas] = await pool.query(`SELECT id FROM reservas WHERE sala_id = ?`, [salaId]);

        for (const reserva of reservas) {
          // Eliminar votos, comentarios y reservas asociadas
          await pool.query(`DELETE FROM votos_salas WHERE reservaId = ?`, [reserva.id]);
          await pool.query(`DELETE FROM reservas WHERE id = ?`, [reserva.id]);
        }

        // Eliminar sala
        await pool.query(`DELETE FROM salas WHERE id = ?`, [salaId]);
      
      return { message: 'Sala y todas sus relaciones eliminadas exitosamente' };
    
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
