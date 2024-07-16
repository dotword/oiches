import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

export const insertGrupoPhotoService = async (photoName, idGrupo) => {
    // Generamos el id de la entrada.
    const photoId = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO grupo_fotos (id, name, grupoId)
        VALUES (?, ?,?)
    `,
        [photoId, photoName, idGrupo]
    );

    const { insertId } = result;

    return insertId;
};

// Función que realiza una consulta a la base de datos para eliminar una foto de una entrada.
export const deleteGrupoPhotoService = async (deletePhoto) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(`DELETE FROM grupo_fotos WHERE id = ?`, [deletePhoto]);
};
