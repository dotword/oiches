import getPool from '../../database/getPool.js';

export const deleteGrupoService = async (grupoId) => {
    try {
        const pool = await getPool();
        // Seleccionar grupo asociado al usuario
        console.log(grupoId);

        // Eliminar media del grupo
        await pool.query(`DELETE FROM grupo_media WHERE grupo_id = ?`, [
            grupoId,
        ]);

        // Eliminar generos de un grupo
        await pool.query(`DELETE FROM generos_grupos WHERE grupoId = ?`, [
            grupoId,
        ]);

        await pool.query(`DELETE FROM grupo_fotos WHERE grupoId = ?`, [
            grupoId,
        ]);

        // Seleccionar reservas del grupo
        const [reservas] = await pool.query(
            `SELECT id FROM reservas WHERE grupo_id = ?`,
            [grupoId]
        );

        for (const reserva of reservas) {
            // Eliminar votos y reservas asociadas
            await pool.query(`DELETE FROM votos_grupos WHERE reservaId = ?`, [
                reserva.id,
            ]);
            await pool.query(`DELETE FROM reservas WHERE id = ?`, [reserva.id]);
        }

        // Eliminar grupo
        await pool.query(`DELETE FROM grupos WHERE id = ?`, [grupoId]);

        return {
            message: 'Grupo y todas sus relaciones eliminadas exitosamente',
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
