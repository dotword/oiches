import getPool from '../../database/getPool.js';

const selectGruposVotosService = async (idGrupo) => {
    const pool = await getPool();

    // Obtenemos el array de los comentarios del grupo
    const [comentarios] = await pool.query(
        `
          SELECT * FROM votos_salas WHERE votos_salas.grupoVota = ?
        `,
        [idGrupo]
    );

    return comentarios;
};

export default selectGruposVotosService;
