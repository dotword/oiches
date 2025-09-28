import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditAdvertService = async (idAdvert, userId) => {
    const pool = await getPool();

    // Obtener el propietario de la notice
    const [advertOwner] = await pool.query(
        `SELECT user_id, expiresAt FROM ad_classifieds WHERE id = ?`,
        [idAdvert]
    );

    const [user] = await pool.query(
        `SELECT id, roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (user[0].roles === 'admin') {
        return;
    }

    // Si no somos los propietarios lanzamos un error.
    if (advertOwner.length === 0 || advertOwner[0].user_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );

    // Comprobar que el anuncio no esté publicado
    const dateExpires = new Date(advertOwner[0].expiresAt);
    const today = new Date();
    if (dateExpires > today)
        throw generateErrorsUtil(
            'No se puede editar un anuncio publicado.',
            404
        );
};

export default canEditAdvertService;
