import getPool from '../../database/getPool.js';
import path from 'path';

const getInfoInscriptionService = async (idGrupo) => {
    const pool = await getPool();

    // Consulta para obtener la info de la inscripción al concurso del usuario
    const [inscription] = await pool.query(
        `
            SELECT
                proyectos_inscritos.id,
                proyectos_inscritos.userId,
                proyectos_inscritos.basesConfirmed,
                proyectos_inscritos.projectAcepted,
                proyectos_inscritos.createdAt,
                proyectos_inscritos.deletedAt,
                grupos.nombre AS artista
            FROM proyectos_inscritos
            LEFT JOIN 
                grupos ON grupos.id = proyectos_inscritos.id 
            WHERE proyectos_inscritos.id = ?
        `,
        [idGrupo]
    );

    if (inscription.length === 0) {
        return null;
    }

    // Obtenemos el array de fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name, es_principal FROM grupo_fotos WHERE grupoId = ?`,
        [idGrupo]
    );
    const fotos = [];

    for (const photo of photos) {
        path.extname(photo.name) !== '.pdf' &&
            fotos.push({
                name: photo.name,
                id: photo.id,
                main: photo.es_principal,
            });
    }

    return { ...inscription[0], fotos };
};

export default getInfoInscriptionService;
