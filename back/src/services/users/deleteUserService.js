import getPool from "../../database/getPool.js";

export const deleteUserService = async (id) => {
  const pool = await getPool();

  try {
    // Seleccionar el usuario
    const [users] = await pool.query(`SELECT id, roles FROM usuarios WHERE id = ?`, [id]);
    const user = users[0];

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.roles === 'grupo') {
      // Seleccionar grupo asociado al usuario
      const [grupos] = await pool.query(`SELECT id FROM grupos WHERE usuario_id = ?`, [user.id]);
      const grupo = grupos[0];

      if (grupo) {
        // Eliminar media del grupo
        await pool.query(`DELETE FROM grupo_media WHERE grupo_id = ?`, [grupo.id]);
        await pool.query(`DELETE FROM grupo_fotos WHERE grupoId = ?`, [grupo.id]);

        // Seleccionar reservas del grupo
        const [reservas] = await pool.query(`SELECT id FROM reservas WHERE grupo_id = ?`, [grupo.id]);

        for (const reserva of reservas) {
          // Eliminar votos y reservas asociadas
          await pool.query(`DELETE FROM votos_grupos WHERE reservaId = ?`, [reserva.id]);
          await pool.query(`DELETE FROM reservas WHERE id = ?`, [reserva.id]);
        }

        // Eliminar grupo
        await pool.query(`DELETE FROM grupos WHERE id = ?`, [grupo.id]);
      }
    }

    if (user.roles === 'sala') {
      // Seleccionar salas asociadas al usuario
      const [salas] = await pool.query(`SELECT id FROM salas WHERE usuario_id = ?`, [user.id]);

      for (const sala of salas) {
        // Eliminar media de la sala
        await pool.query(`DELETE FROM sala_fotos WHERE salaId = ?`, [sala.id]);

        // Seleccionar reservas de la sala
        const [reservas] = await pool.query(`SELECT id FROM reservas WHERE sala_id = ?`, [sala.id]);

        for (const reserva of reservas) {
          // Eliminar votos, comentarios y reservas asociadas
          await pool.query(`DELETE FROM votos_salas WHERE reservaId = ?`, [reserva.id]);
          await pool.query(`DELETE FROM reservas WHERE id = ?`, [reserva.id]);
        }

        // Eliminar sala
        await pool.query(`DELETE FROM salas WHERE id = ?`, [sala.id]);
      }
    }

    // Eliminar usuario
    await pool.query(`DELETE FROM usuarios WHERE id = ?`, [user.id]);

    return { message: 'Usuario y todas sus relaciones eliminadas exitosamente' };
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
