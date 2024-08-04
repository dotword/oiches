import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

export const insertSalaGenerosService = async (genero, salaId) => {
    // Generamos el id de la entrada.
    const id = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO generos_salas (id, salaId, generoId)
        VALUES (?, ?, ?)
    `,
        [id, salaId, genero]
    );

    const { insertId } = result;

    return insertId;
};

export const deleteSalaGenerosService = async (genero, salaId) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(
        `DELETE FROM generos_salas WHERE generoId = ? AND salaId = ?`,
        [genero, salaId]
    );
};
