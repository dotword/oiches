import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import getPool from '../../database/getPool.js';

const createNoticeboardService = async (
    userId,
    salaGrupo_id,
    category_id,
    provincia,
    titulo,
    descripcion
) => {
    const pool = await getPool();

    // Buscar el role del usuario
    const [userRole] = await pool.query(
        'SELECT roles FROM usuarios WHERE id = ?',
        [userId]
    );

    // Buscar el role de la categoria
    const [catRole] = await pool.query(
        'SELECT role FROM category_noticeboard WHERE id = ?',
        [category_id]
    );

    if (userRole[0].roles !== catRole[0].role)
        throw generateErrorsUtil(
            'No puedes publicar en este tipo de categoría',
            404
        );

    // Generamos el id de la entrada.
    const noticeboardId = uuid();

    await pool.query(
        `
            INSERT INTO noticeboard (id, usuario_id, salaGrupo_id, category_id, provincia, titulo, descripcion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            noticeboardId,
            userId,
            salaGrupo_id,
            category_id,
            provincia,
            titulo,
            descripcion,
        ]
    );

    return noticeboardId;
};

export default createNoticeboardService;
