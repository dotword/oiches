import getPool from '../../database/getPool.js';

const deleteAgenciaService = async (idAgencia) => {
    const pool = await getPool();

    try {
        await pool.query(`DELETE FROM agencias WHERE id = ?`, [idAgencia]);

        return {
            message: 'Agencia y todas sus relaciones eliminadas con éxito',
        };
    } catch (error) {
        console.error('Error al eliminar la agencia:', error);
        throw error;
    }
};

export default deleteAgenciaService;
