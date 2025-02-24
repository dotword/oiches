import { v4 as uuidv4 } from 'uuid';
import getPool from '../../database/getPool.js';

const insertGrupoService = async (
    nombre,
    provincia,
    web,
    honorarios,
    honorarios_to,
    condiciones,
    biografia,
    published,
    userId
) => {
    const pool = await getPool();

    const newGrupoId = uuidv4();

    await pool.query(
        `INSERT INTO grupos (id, nombre, provincia, web, honorarios, honorarios_to, condiciones, biografia, published, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            newGrupoId,
            nombre,
            provincia,
            web,
            honorarios,
            honorarios_to,
            condiciones,
            biografia,
            published,
            userId,
        ]
    );

    return newGrupoId;
};

export default insertGrupoService;
