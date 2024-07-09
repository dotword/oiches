import getPool from '../../database/getPool.js';

const insertSalaProvinciaService = async (provinciaId, salaId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO provincias_salas (provinciaId, salaId)
        VALUES (?,?)
    `,
        [provinciaId, salaId]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaProvinciaService;
