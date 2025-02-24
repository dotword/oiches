import getPool from '../../database/getPool.js';

const deleteSalaService = async (userId) => {
    const pool = await getPool();

    try {
        // Seleccionar las salas asociadas al usuario
        const [salas] = await pool.query(
            `SELECT id FROM salas WHERE usuario_id = ?`,
            [userId]
        );

        for (const sala of salas) {
            // Eliminar info de la sala
            await pool.query(`DELETE FROM sala_fotos WHERE salaId = ?`, [
                sala.id,
            ]);
            await pool.query(`DELETE FROM generos_salas WHERE salaId = ?`, [
                sala.id,
            ]);
            await pool.query(
                `DELETE FROM fechas_disponibles WHERE sala_id = ?`,
                [sala.id]
            );
            // Seleccionar reservas de la sala
            const [reservas] = await pool.query(
                `SELECT id FROM reservas WHERE sala_id = ?`,
                [sala.id]
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

            // Eliminar sala
            await pool.query(`DELETE FROM salas WHERE id = ?`, [sala.id]);
        }

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

export default deleteSalaService;
