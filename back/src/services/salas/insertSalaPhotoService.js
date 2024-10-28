import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

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

export const updateMainSalaPhotoService = async (photoId, idSala) => {
    const pool = await getPool();

    await pool.query(
        'UPDATE sala_fotos SET es_principal = FALSE WHERE salaId = ?',
        [idSala]
    );

    // Luego, marca la foto seleccionada como principal.
    const [result] = await pool.query(
        'UPDATE sala_fotos SET es_principal = TRUE WHERE id = ? AND salaId = ?',
        [photoId, idSala]
    );

    if (result.affectedRows === 0) {
        throw generateErrorsUtil(
            'La foto no fue encontrada o no pertenece a la sala.',
            404
        );
    }
};
