import getPool from "../../database/getPool.js";
import generateErrorsUtil from "../../utils/generateErrorsUtil.js";
import { v4 as uuidv4 } from 'uuid';
import getGrupoById from "../grupos/getGrupoIdService.js";

const insertVoteSalaService = async (value, idSala, voto_grupo_id) => {
    const pool = await getPool();

    // Verify the voto_grupo_id value
    await getGrupoById(voto_grupo_id);

    const [votes] = await pool.query(
        `
            SELECT id FROM votos_salas
            WHERE voto_grupo_id=? AND sala_id=?
        `,
        [voto_grupo_id, idSala]
    );

    if (votes.length) throw generateErrorsUtil('No se puede votar más de una vez la entrada', 409);

    const id = uuidv4(); // Generate a unique UUID for the 'id' column

    await pool.query(
        `
            INSERT INTO votos_salas (id, value, sala_id, voto_grupo_id)
            VALUES (?, ?, ?, ?)
        `,
        [id, value, idSala, voto_grupo_id]
    );

    const [avgVotes] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM votos_salas WHERE sala_id=?
        `,
        [idSala]
    );

    return Number(avgVotes[0].avg);
};

export default insertVoteSalaService;