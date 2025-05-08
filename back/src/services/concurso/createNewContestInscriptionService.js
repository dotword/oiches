import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createNewContestInscriptionService = async (
    idGrupo,
    userId,
    basesConfirmed
) => {
    const pool = await getPool();

    // Comprobar si el grupo está aprobado
    const [grupoInfo] = await pool.query(
        'SELECT published FROM grupos WHERE id = ?',
        [idGrupo]
    );
    if (grupoInfo[0].published === 0)
        throw generateErrorsUtil(
            'Tu proyecto musical tiene que estar aprobado para poder inscribirte en el concurso.',
            404
        );
    // Comprobar si el grupo ya está inscrito en el concurso
    const [grupoInscrito] = await pool.query(
        'SELECT id FROM proyectos_inscritos WHERE id = ?',
        [idGrupo]
    );
    if (grupoInscrito.length)
        throw generateErrorsUtil(
            'Ya estás inscrito en el concurso con este proyecto musical.',
            404
        );

    await pool.query(
        `INSERT INTO proyectos_inscritos (id, userId, basesConfirmed) VALUES (?, ?, ?)`,
        [idGrupo, userId, basesConfirmed]
    );

    return idGrupo;
};

export default createNewContestInscriptionService;
