import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const selectGruposVotosService = async (idGrupo) => {
    const pool = await getPool();

    // Obtenemos el array de los comentarios del grupo
    const [comentarios] = await pool.query(
        `
          SELECT * FROM votos_salas WHERE votos_salas.grupoVota = ?
        `,
        [idGrupo]
    );

    if (comentarios.length === 0) {
        throw generateErrorsUtil('No hay comentarios', 404);
    }
    return comentarios;
};

export default selectGruposVotosService;
