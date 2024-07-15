import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

export const insertGrupoMediaService = async (mediaName, idGrupo) => {
    // Generamos el id de la entrada.
    const mediaId = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO grupo_media (id, grupo_id, url)
        VALUES (?, ?,?)
    `,
        [mediaId, idGrupo, mediaName]
    );

    const { insertId } = result;

    return insertId;
};

export const deleteGrupoMediaService = async (mediaDelete) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(`DELETE FROM grupo_media WHERE id = ?`, [mediaDelete]);
};
