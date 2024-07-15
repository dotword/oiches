import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertVoteSalaService = async (value, idSala, userId) => {
    const pool = await getPool();

    
    const [userGroup] = await pool.query(`
        SELECT id FROM Grupos WHERE usuario_id = ?
    `, [userId]);

    if (userGroup.length === 0) {
        throw generateErrorsUtil('Usuario no pertenece a ningún grupo', 404);
    }

    const grupoId = userGroup[0].id;

    await pool.query(`
        INSERT INTO votos_salas (id, value, voto_grupo_id, sala_id) VALUES
        (UUID(), ?, ?, ?)
    `, [value, grupoId, idSala]);

   
    const [votes] = await pool.query(`
        SELECT AVG(value) AS avgVotes FROM votos_salas WHERE sala_id = ?
    `, [idSala]);

    return votes[0].avgVotes;
};

export default insertVoteSalaService;

