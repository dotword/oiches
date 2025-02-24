import getPool from '../../database/getPool.js';

const nextPrevAgenciaService = async (idAgencia) => {
    const pool = await getPool();
    const [nextAgencia] = await pool.query(
        `
        SELECT 
            (SELECT id FROM agencias 
            WHERE createdAt < (SELECT createdAt FROM agencias WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt DESC 
            LIMIT 1) AS anterior,

            (SELECT id FROM agencias 
            WHERE createdAt > (SELECT createdAt FROM agencias WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt ASC 
            LIMIT 1) AS posterior
        `,
        [idAgencia, idAgencia]
    );

    return nextAgencia;
};

export default nextPrevAgenciaService;
