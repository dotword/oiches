import getPool from '../../database/getPool.js';

const insertSalaPhotoService = async (photoName, idSala) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO sala_fotos (name, salaId)
        VALUES (?,?)
    `,
        [photoName, idSala]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaPhotoService;
