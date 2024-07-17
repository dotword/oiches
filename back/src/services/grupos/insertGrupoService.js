// src/services/grupos/insertGrupoService.js

import { v4 as uuidv4 } from 'uuid';
import getPool from '../../database/getPool.js';

const insertGrupoService = async (
    nombre,
    provincia,
    generos,
    honorarios,
    biografia,
    usuario_id,
    rider
) => {
    const pool = await getPool();

    const newGrupoId = uuidv4();

    await pool.query(
        `INSERT INTO Grupos (id, nombre, provincia, generos, honorarios, biografia, usuario_id, rider) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            newGrupoId,
            nombre,
            provincia,
            generos,
            honorarios,
            biografia,
            usuario_id,
            rider,
        ]
    );

    return newGrupoId;
};

export default insertGrupoService;
