import { v4 as uuid } from 'uuid';
import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertAgenciaService = async (
    userId,
    nombre,
    provincia,
    descripcion,
    web
) => {
    const pool = await getPool();

    // Comprobamos que el mismo usuario no tenga otra agencia creada
    const [agenciaResults] = await pool.query(
        'SELECT id FROM agencias WHERE usuario_id = ?',
        [userId]
    );
    if (agenciaResults.length)
        throw generateErrorsUtil(
            'Ya has publicado tu agencia anteriormente.',
            404
        );

    // Generamos el id de la entrada.
    const agenciaId = uuid();

    await pool.query(
        `
        INSERT INTO agencias (id, usuario_id, nombre, provincia, descripcion, web)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [agenciaId, userId, nombre, provincia, descripcion, web]
    );

    return agenciaId;
};

export default insertAgenciaService;
