import getPool from "../../database/getPool.js";
import generateErrorsUtil from "../../utils/generateErrorsUtil.js";
import { v4 as uuidv4 } from 'uuid';
import selectGrupoByIdService from '../grupos/selectGrupoByIdService.js';

const insertVoteSalaService = async (value, idSala, idGrupo) => {
    const pool = await getPool();

    try {
        // Verificar si el grupo existe
        await selectGrupoByIdService(idGrupo);

        const [votes] = await pool.query(
            `
                SELECT id FROM votos_salas
                WHERE voto_grupo_id=? AND sala_id=?
            `,
            [idGrupo, idSala]
        );

        if (votes.length) {
            throw generateErrorsUtil('No se puede votar más de una vez la entrada', 409);
        }

        const id = uuidv4(); // Generar un UUID único para la columna 'id'

        await pool.query(
            `
                INSERT INTO votos_salas (id, value, voto_grupo_id, sala_id)
                VALUES (?, ?, ?, ?)
            `,
            [id, value, idGrupo, idSala]
        );

        const [avgVotes] = await pool.query(
            `
                SELECT AVG(value) AS avg FROM votos_salas WHERE sala_id=?
            `,
            [idSala]
        );

        return Number(avgVotes[0].avg);
    } catch (error) {
        if (error.httpStatus === 404) {
            throw generateErrorsUtil('Grupo no encontrado', 404);
        } else {
            throw error;
        }
    }
};

export default insertVoteSalaService;