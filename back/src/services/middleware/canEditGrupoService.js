import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditGrupoService = async (idGrupo, userId) => {
    const pool = await getPool();
    const [grupoOwner] = await pool.query(
        `SELECT usuario_id FROM grupos WHERE id = ?`,
        [idGrupo]
    );

    // Si no somos los propietarios lanzamos un error.
    if (grupoOwner[0].usuario_id !== userId)
        throw generateErrorsUtil(
            'El usuario no está autorizado para hacer esta operación',
            409
        );
};

export default canEditGrupoService;
