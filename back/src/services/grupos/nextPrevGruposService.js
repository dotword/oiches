import getPool from '../../database/getPool.js';

const nextPrevGruposService = async (idGrupo) => {
    const pool = await getPool();

    const [nextGrupo] = await pool.query(
        `
        SELECT 
            (SELECT id FROM grupos 
            WHERE createdAt < (SELECT createdAt FROM grupos WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt DESC 
            LIMIT 1) AS anterior,

            (SELECT id FROM grupos 
            WHERE createdAt > (SELECT createdAt FROM grupos WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt ASC 
            LIMIT 1) AS posterior
        `,
        [idGrupo, idGrupo]
    );

    return nextGrupo;
};

export default nextPrevGruposService;
