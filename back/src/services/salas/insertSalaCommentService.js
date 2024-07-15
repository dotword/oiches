import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertCommentSalaService = async (comment, idSala, userId) => {
    const pool = await getPool();

  
    const [userGroup] = await pool.query(`
        SELECT id FROM Grupos WHERE usuario_id = ?
    `, [userId]);

    if (userGroup.length === 0) {
        throw generateErrorsUtil('Usuario no pertenece a ningún grupo', 404);
    }

    const grupoId = userGroup[0].id;

    await pool.query(`
        INSERT INTO sala_comments (id, descripcion, sala_id, grupo_id) VALUES
        (UUID(), ?, ?, ?)
    `, [comment, idSala, grupoId]);
};

export default insertCommentSalaService;

