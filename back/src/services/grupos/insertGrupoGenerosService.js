import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

export const insertGrupoGenerosService = async (genero, idGrupo) => {
    // Generamos el id de la entrada.
    const id = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO generos_grupos (id, grupoId, generoId)
        VALUES (?, ?, ?)
    `,
        [id, idGrupo, genero]
    );

    const { insertId } = result;

    return insertId;
};

export const deleteGrupoGenerosService = async (genero, idGrupo) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(
        `DELETE FROM generos_grupos WHERE generoId = ? AND grupoId = ?`,
        [genero, idGrupo]
    );
};
