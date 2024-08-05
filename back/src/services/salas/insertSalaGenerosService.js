import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

export const insertSalaGenerosService = async (genero, idSala) => {
    // Generamos el id de la entrada.
    const id = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO generos_salas (id, salaId, generoId)
        VALUES (?, ?, ?)
    `,
        [id, idSala, genero]
    );

    const { insertId } = result;

    return insertId;
};

export const deleteSalaGenerosService = async (genreDelete, idSala) => {
    const pool = await getPool();

    // Convertimos el array de géneros a una lista adecuada para la cláusula IN
    const generosList = genreDelete.map((g) => `'${g}'`).join(', ');

    // Eliminamos el género
    const query = `
   DELETE FROM generos_salas
   WHERE salaId = ?
   AND generoId IN (${generosList})
`;

    await pool.query(query, [idSala]);
};
