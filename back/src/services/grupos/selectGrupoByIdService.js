import path from 'path';
import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const selectGrupoByIdService = async (idGrupo) => {
    const pool = await getPool();
    const [entry] = await pool.query(
        `
            SELECT 
                G.id,
                G.usuario_id,
                G.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = G.provincia) AS provincia,
                (SELECT id FROM provincias WHERE provincias.id = G.provincia) AS provinciaId,
                G.web,
                (SELECT email FROM usuarios WHERE usuarios.id = G.usuario_id) AS email,
                (SELECT avatar FROM usuarios WHERE usuarios.id = G.usuario_id) AS avatar,
                A.nombre AS agencia,
                A.id AS agenciaId,
                G.honorarios,
                G.honorarios_to,
                G.condiciones,
                G.biografia,
                G.usuario_id,
                G.published,
                AVG(IFNULL(V.voto, 0)) AS votes,
                G.createdAt
            FROM grupos G
            LEFT JOIN votos_grupos V ON V.grupoVotado = G.id
            LEFT JOIN agencias A ON A.usuario_id = G.usuario_id             
            INNER JOIN usuarios U ON U.id = G.usuario_id
            WHERE G.id = ?
            GROUP BY G.id, A.id
        `,
        [idGrupo]
    );

    // Obtenemos el array de los comentarios del grupo
    const [comentarios] = await pool.query(
        `
          SELECT
              votos_grupos.comentario,
              votos_grupos.voto,
              votos_grupos.createdAt,
              votos_grupos.id,
              salas.id AS salaVotaId,
              salas.nombre AS salaVotaNombre,
              usuarios.avatar AS salaAvatar
          FROM votos_grupos
          JOIN salas ON salas.id = votos_grupos.salaVota
          JOIN usuarios ON usuarios.id = salas.usuario_id
          WHERE votos_grupos.grupoVotado = ?
        `,
        [idGrupo]
    );
    // Agregamos el array de los comentarios del grupo.
    entry[0].comentarios = comentarios;

    // Obtenemos el array de los generos del grupo.
    const [genero] = await pool.query(
        `SELECT 
            generoId,
            (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = generos_grupos.generoId) AS generoName
        FROM generos_grupos
        WHERE grupoId = ?`,
        [idGrupo]
    );
    // Agregamos el array de los generos del grupo.
    entry[0].genero = genero;

    // Obtenemos el array de los media del grupo.
    const [media] = await pool.query(
        `SELECT id, url FROM grupo_media WHERE grupo_id = ?`,
        [idGrupo]
    );
    // Agregamos el array de los media del grupo.
    entry[0].media = media;

    // Obtenemos el array de fotos de la entrada.
    const [photos] = await pool.query(
        `SELECT id, name, es_principal FROM grupo_fotos WHERE grupoId = ?`,
        [idGrupo]
    );
    const fotos = [];
    const pdf = [];

    for (const photo of photos) {
        path.extname(photo.name) === '.pdf'
            ? pdf.push({
                  name: photo.name,
                  id: photo.id,
              })
            : fotos.push({
                  name: photo.name,
                  id: photo.id,
                  main: photo.es_principal,
              });
    }

    // Obtenemos el array de las reservas del grupo.
    const [reservations] = await pool.query(
        `
        SELECT
        R.sala_id,
        S.nombre AS sala,
        R.fecha,
        R.confirmada
        FROM reservas R
        LEFT JOIN salas S ON S.id= R.sala_id 
        WHERE grupo_id = ?
        `,
        [idGrupo]
    );

    if (entry.length === 0) {
        throw generateErrorsUtil('Grupo no encontrado', 404);
    }
    return {
        ...entry[0],
        comentarios,
        photos,
        fotos,
        pdf,
        genero,
        reservations,
    };
};

export default selectGrupoByIdService;
