import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertCommentGrupoService = async (comment, idGrupo, userId) => {
    const pool = await getPool();

    
    const [userSala] = await pool.query(`
        SELECT id FROM Salas WHERE usuario_id = ?
    `, [userId]);

    if (userSala.length === 0) {
        throw generateErrorsUtil('Usuario no pertenece a ninguna sala', 404);
    }

    const salaId = userSala[0].id;

    await pool.query(`
        INSERT INTO grupo_comments (id, descripcion, grupo_id, sala_id) VALUES
        (UUID(), ?, ?, ?)
    `, [comment, idGrupo, salaId]);
};

export default insertCommentGrupoService;
