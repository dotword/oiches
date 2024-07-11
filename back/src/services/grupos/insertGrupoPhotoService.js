import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

const insertGrupoPhotoService = async (photoName, idGrupo) => {
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

export default insertGrupoPhotoService;
