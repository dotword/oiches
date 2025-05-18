import { v4 as uuid } from 'uuid';
import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertAgenciaService = async (
    userId,
    nombre,
    provincia,
    descripcion,
    web,
    especialidad
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

    // Insertar las especialidades en la tabla intermedia
    if (Array.isArray(especialidad) && especialidad.length > 0) {
        const values = especialidad.map((especialidadId) => [
            uuid(),
            agenciaId,
            especialidadId,
        ]);

        await pool.query(
            `INSERT INTO agencias_especialidades (id, agencia_id, especialidad_id) VALUES ?`,
            [values]
        );
    }

    return agenciaId;
};

export default insertAgenciaService;
