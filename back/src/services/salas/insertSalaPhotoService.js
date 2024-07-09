import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

const insertSalaPhotoService = async (photoName, idSala) => {
    // Generamos el id de la entrada.
    const photoId = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO sala_fotos (id, name, salaId)
        VALUES (?, ?,?)
    `,
        [photoId, photoName, idSala]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaPhotoService;
