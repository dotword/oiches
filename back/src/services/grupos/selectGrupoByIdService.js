import path from 'path';
import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const selectGrupoByIdService = async (idGrupo) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                G.id,
                G.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = G.provincia) AS Provincia,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = G.generos) AS Genero,
                G.honorarios,
                G.biografia,
                G.usuario_id,
                G.rider,
                G.email,
                AVG(IFNULL(V.value, 0)) AS votes,
                G.createdAt
            FROM Grupos G
            LEFT JOIN votos_grupos V ON V.grupo_id = G.id           
            INNER JOIN usuarios U ON U.id = G.usuario_id
            WHERE G.id = ?
            GROUP BY G.id
        `,
        [idGrupo]
    );

    // Obtenemos el array de los media del grupo.
    const [media] = await pool.query(
        `SELECT id, url FROM grupo_media WHERE grupo_id = ?`,
        [idGrupo]
    );
    // Agregamos el array de los comentarios del grupo.
    entry[0].media = media;

    if (entry.length === 0) {
        throw generateErrorsUtil('Grupo no encontrado', 404);
    }

    // Obtenemos el array de fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name FROM grupo_fotos WHERE grupoId = ?`,
        [idGrupo]
    );
    const fotos = [];
    const pdf = [];

    for (const photo of photos) {
        path.extname(photo.name) === '.pdf'
            ? pdf.push({
                  name: photo.name,
              })
            : fotos.push({
                  name: photo.name,
              });
    }

    // Obtenemos el array de los comentarios del grupo.
    const [comments] = await pool.query(
        `SELECT descripcion, sala_id FROM grupo_comments WHERE grupo_id = ?`,
        [idGrupo]
    );

    // Obtenemos el array de las reservas del grupo.
    const [reservations] = await pool.query(
        `
            SELECT
                R.nombre,
                R.sala_id,
                S.nombre AS sala,
                R.fecha,
                R.hora,
                R.confirmada
            FROM Reservas R
            LEFT JOIN Salas S ON S.id= R.sala_id 
            WHERE grupo_id = ?
        `,
        [idGrupo]
    );

    return {
        ...entry[0],
        photos,
        fotos,
        pdf,
        comments,
        reservations,
    };
};

export default selectGrupoByIdService;
