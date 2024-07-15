import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertVoteGrupoService = async (value, idGrupo, userId) => {
    const pool = await getPool();

    
    const [userSala] = await pool.query(`
        SELECT id FROM Salas WHERE usuario_id = ?
    `, [userId]);

    if (userSala.length === 0) {
        throw generateErrorsUtil('Usuario no pertenece a ninguna sala', 404);
    }

    const salaId = userSala[0].id;

    await pool.query(`
        INSERT INTO votos_grupos (id, value, grupo_id, voto_sala_id) VALUES
        (UUID(), ?, ?, ?)
    `, [value, idGrupo, salaId]);

    
    const [votes] = await pool.query(`
        SELECT AVG(value) AS avgVotes FROM votos_grupos WHERE grupo_id = ?
    `, [idGrupo]);

    return votes[0].avgVotes;
};

export default insertVoteGrupoService;
