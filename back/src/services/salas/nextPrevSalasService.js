import getPool from '../../database/getPool.js';

const nextPrevSalasService = async (idSala) => {
    const pool = await getPool();

    const [nextSala] = await pool.query(
        `
        SELECT 
            (SELECT id FROM salas 
            WHERE createdAt < (SELECT createdAt FROM salas WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt DESC 
            LIMIT 1) AS anterior,

            (SELECT id FROM salas 
            WHERE createdAt > (SELECT createdAt FROM salas WHERE id = ?) 
            AND published = 1
            ORDER BY createdAt ASC 
            LIMIT 1) AS posterior
        `,
        [idSala, idSala]
    );

    return nextSala;
};

export default nextPrevSalasService;
