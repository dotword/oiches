import getPool from '../../database/getPool.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const registerVoterVoteService = async (idProyecto, email) => {
    const pool = await getPool();

    // Generamos el id.
    const votosId = uuid();

    // Comprobar que el votante exista, esté verificado y obtener su id
    const [votanteId] = await pool.query(
        `SELECT id, verified FROM voters WHERE email = ?`,
        [email]
    );

    if (!votanteId[0]) {
        throw generateErrorsUtil(
            'Este email no está registrado para votar',
            404
        );
    }
    if (!votanteId[0].verified) {
        throw generateErrorsUtil('El email no está verificado', 403);
    }
    // Comprobar que el proyecto exista y esté inscrtito al concurso
    const [proyectoId] = await pool.query(
        `SELECT id FROM proyectos_inscritos WHERE id = ? AND projectAcepted = 1`,
        [idProyecto]
    );

    if (!proyectoId[0]) {
        throw generateErrorsUtil(
            'El proyecto musical no existe o no está inscrito al concurso',
            404
        );
    }

    // Comprobar que el votante no haya votado más de dos veces
    const [[{ count }]] = await pool.query(
        `SELECT COUNT(*) as count FROM contest_votes WHERE voter_id = ?`,
        [votanteId[0].id]
    );

    if (count >= 3) {
        throw generateErrorsUtil('Ya has votado a 3 proyectos', 403);
    }

    // Comprobar que el votante no haya votado al mismo proyecto
    const [votoId] = await pool.query(
        `SELECT id FROM contest_votes WHERE voter_id = ? AND project_id = ?`,
        [votanteId[0].id, idProyecto]
    );

    if (votoId[0]) {
        throw new Error('Ya has votado a este proyecto');
    }

    await pool.query(
        `
        INSERT INTO contest_votes (id, voter_id, project_id) VALUES
        (?, ?, ?)
    `,
        [votosId, votanteId[0].id, idProyecto]
    );
    return {
        votosRestantes: 2 - count,
        email,
        idProyecto,
    };
};

export default registerVoterVoteService;
