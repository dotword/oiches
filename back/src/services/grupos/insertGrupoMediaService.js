import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

const insertGrupoMediaService = async (mediaName, idGrupo) => {
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

export default insertGrupoMediaService;
