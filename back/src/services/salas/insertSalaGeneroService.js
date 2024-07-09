import getPool from '../../database/getPool.js';

import { v4 as uuid } from 'uuid';

const insertSalaGeneroService = async (gen, salaId) => {
    const pool = await getPool();

    // Generamos el id de la entrada.
    const genId = uuid();

    const [result] = await pool.query(
        `
        INSERT INTO generos_salas (id, generoId, salaId)
        VALUES (?, ?,?)
    `,
        [genId, gen, salaId]
    );

    const { insertId } = result;

    return insertId;
};

export default insertSalaGeneroService;
