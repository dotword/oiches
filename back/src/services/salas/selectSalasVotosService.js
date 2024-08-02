import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const selectSalasVotosService = async (idSala) => {
    const pool = await getPool();

    // Obtenemos el array de los comentarios de la sala
    const [comentarios] = await pool.query(
        `
          SELECT * FROM votos_grupos WHERE votos_grupos.salaVota = ?
        `,
        [idSala]
    );

    if (comentarios.length === 0) {
        throw generateErrorsUtil('No hay comentarios', 404);
    }
    return comentarios;
};

export default selectSalasVotosService;
