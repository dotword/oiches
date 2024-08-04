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

export const deleteGrupoGenerosService = async (genreDelete, idGrupo) => {
    const pool = await getPool();

    // Convertimos el array de géneros a una lista adecuada para la cláusula IN
    const generosList = genreDelete.map((g) => `'${g}'`).join(', ');
    // Eliminamos el género
    const query = `
    DELETE FROM generos_grupos
    WHERE grupoId = ?
    AND generoId IN (${generosList})
`;

    await pool.query(query, [idGrupo]);
};
