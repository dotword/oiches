import getPool from '../../database/getPool.js';

const selectSalasVotosService = async (idSala) => {
    const pool = await getPool();

    // Obtenemos el array de los comentarios de la sala
    const [comentarios] = await pool.query(
        `
          SELECT * FROM votos_grupos WHERE votos_grupos.salaVota = ?
        `,
        [idSala]
    );

    return comentarios;
};

export default selectSalasVotosService;
