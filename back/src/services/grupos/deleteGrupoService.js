import getPool from '../../database/getPool.js';

export const deleteGrupoService = async (grupoId) => {
    const pool = await getPool();
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Eliminar media del grupo
        await connection.query(`DELETE FROM grupo_media WHERE grupo_id = ?`, [
            grupoId,
        ]);

        // Eliminar generos de un grupo
        await connection.query(`DELETE FROM generos_grupos WHERE grupoId = ?`, [
            grupoId,
        ]);

        // Eliminar fotos del grupo
        await connection.query(`DELETE FROM grupo_fotos WHERE grupoId = ?`, [
            grupoId,
        ]);

        // Seleccionar reservas del grupo
        const [reservas] = await connection.query(
            `SELECT id FROM reservas WHERE grupo_id = ?`,
            [grupoId]
        );

        for (const reserva of reservas) {
            // Eliminar votos y reservas asociadas
            await connection.query(
                `DELETE FROM votos_grupos WHERE reservaId = ?`,
                [reserva.id]
            );

            await connection.query(
                `DELETE FROM votos_salas WHERE reservaId = ?`,
                [reserva.id]
            );

            await connection.query(`DELETE FROM reservas WHERE id = ?`, [
                reserva.id,
            ]);
        }

        // Eliminar grupo
        await connection.query(`DELETE FROM grupos WHERE id = ?`, [grupoId]);

        await connection.commit();

        return {
            message: 'Grupo y todas sus relaciones eliminadas exitosamente',
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
