import getPool from '../../database/getPool.js';

const insertSalaGeneroService = async (generoId, salaId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO generos_salas (generoId, salaId)
        VALUES (?,?)
    `,
        [generoId, salaId]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaGeneroService;
