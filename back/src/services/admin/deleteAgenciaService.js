import getPool from '../../database/getPool.js';

const deleteAgenciaService = async (userId) => {
    const pool = await getPool();

    try {
        // Seleccionar grupos asociado al usuario
        const [grupos] = await pool.query(
            `SELECT id FROM grupos WHERE usuario_id = ?`,
            [userId]
        );

        for (const grupo of grupos) {
            // Eliminar info del grupo
            await pool.query(`DELETE FROM grupo_media WHERE grupo_id = ?`, [
                grupo.id,
            ]);
            await pool.query(`DELETE FROM grupo_fotos WHERE grupoId = ?`, [
                grupo.id,
            ]);
            await pool.query(`DELETE FROM generos_grupos WHERE grupoId = ?`, [
                grupo.id,
            ]);

            // Seleccionar reservas del grupo
            const [reservas] = await pool.query(
                `SELECT id FROM reservas WHERE grupo_id = ?`,
                [grupo.id]
            );

            for (const reserva of reservas) {
                // Eliminar votos, conciertos y reservas asociadas
                await pool.query(`DELETE FROM conciertos WHERE reservaId = ?`, [
                    reserva.id,
                ]);

                await pool.query(
                    `DELETE FROM votos_grupos WHERE reservaId = ?`,
                    [reserva.id]
                );
                await pool.query(
                    `DELETE FROM votos_salas WHERE reservaId = ?`,
                    [reserva.id]
                );
                await pool.query(`DELETE FROM reservas WHERE id = ?`, [
                    reserva.id,
                ]);
            }

            // Eliminar grupo
            await pool.query(`DELETE FROM grupos WHERE id = ?`, [grupo.id]);
        }

        // Eliminar la agencia
        await pool.query(`DELETE FROM agencias WHERE usuario_id = ?`, [userId]);

        // Eliminar usuario de la DB
        await pool.query(`DELETE FROM usuarios WHERE id = ?`, [userId]);

        return {
            message: 'Usuario y todas sus relaciones eliminadas con éxito',
        };
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};

export default deleteAgenciaService;
