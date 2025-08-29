import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditAdvertService = async (idAdvert, userId) => {
    const pool = await getPool();

    // Obtener el propietario de la notice
    const [noticeOwner] = await pool.query(
        `SELECT user_id, status FROM ad_classifieds WHERE id = ?`,
        [idAdvert]
    );

    console.log('noticeOwner', noticeOwner);

    const [user] = await pool.query(
        `SELECT id, roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (user[0].roles === 'admin') {
        return;
    }

    // Si no somos los propietarios lanzamos un error.
    if (noticeOwner.length === 0 || noticeOwner[0].user_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );

    // Comprobar que el anuncio no esté publicado
    if (noticeOwner[0].status !== 'pending')
        throw generateErrorsUtil(
            'No se puede editar un anuncio publicado.',
            409
        );
};

export default canEditAdvertService;
