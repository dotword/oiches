import { v4 as uuidv4 } from 'uuid';
import getPool from '../../database/getPool.js';

const insertGrupoService = async (
    nombre,
    provincia,
    honorarios,
    biografia,
    usuario_id
) => {
    const pool = await getPool();

    const newGrupoId = uuidv4();

    await pool.query(
        `INSERT INTO Grupos (id, nombre, provincia, honorarios, biografia, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [newGrupoId, nombre, provincia, honorarios, biografia, usuario_id]
    );

    return newGrupoId;
};

export default insertGrupoService;
