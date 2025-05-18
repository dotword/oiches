import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditNoticeService = async (idNotice, userId) => {
    const pool = await getPool();

    // Obtener el propietario de la notice
    const [noticeOwner] = await pool.query(
        `SELECT usuario_id FROM noticeboard WHERE id = ?`,
        [idNotice]
    );

    const [user] = await pool.query(
        `SELECT id,roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (user[0].roles === 'admin') {
        return;
    }

    // Si no somos los propietarios lanzamos un error.
    if (noticeOwner[0].usuario_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );
};

export default canEditNoticeService;
