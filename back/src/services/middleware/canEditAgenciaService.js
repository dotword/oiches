import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditAgenciaService = async (idAgencia, userId) => {
    const pool = await getPool();

    const [agenciaOwner] = await pool.query(
        `SELECT usuario_id FROM agencias WHERE id = ?`,
        [idAgencia]
    );

    const [user] = await pool.query(
        `SELECT id,roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (user[0].roles === 'admin') {
        return;
    }

    // Si no somos los propietarios lanzamos un error.
    if (agenciaOwner[0].usuario_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );
};

export default canEditAgenciaService;
