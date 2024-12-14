import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditSalaService = async (idSala, userId) => {
    const pool = await getPool();

    console.log('idSala ', idSala);
    console.log('userid ', userId);

    const [salaOwner] = await pool.query(
        `SELECT usuario_id FROM salas WHERE id = ?`,
        [idSala]
    );

    const [user] = await pool.query(
        `SELECT id,roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    if (user[0].roles === 'admin') {
        return;
    }

    // Si no somos los propietarios lanzamos un error.
    if (salaOwner[0].usuario_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );
};

export default canEditSalaService;
