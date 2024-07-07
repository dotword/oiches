import getPool from '../../database/getPool.js';

const insertSalaPhotoService = async (photoName, salaId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO sala_fotos (name, salaId)
        VALUES (?,?)
    `,
        [photoName, salaId]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaPhotoService;
