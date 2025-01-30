import path from 'path';
import getPool from '../../database/getPool.js';

const selectSalaByIdService = async (idSala) => {
    const pool = await getPool();

    // Consulta para obtener la sala y la información relacionada, incluyendo el avatar del usuario
    const [entry] = await pool.query(
        `
            SELECT 
                S.id,
                S.usuario_id,
                S.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = S.provincia) AS provincia,
                (SELECT id FROM provincias WHERE provincias.id = S.provincia) AS provinciaId,
                S.direccion,
                S.ciudad,
                S.precios,
                S.capacidad,
                S.descripcion,
                S.equipamiento,
                S.web,
                S.calendarActive,
                S.condiciones,
                S.published,
                (SELECT email FROM usuarios WHERE usuarios.id = S.usuario_id) AS email,
                U.avatar AS usuarioAvatar,
                S.createdAt,
                AVG(IFNULL(V.voto, 0)) AS votos
            FROM salas S
            LEFT JOIN votos_salas V ON V.salaVotada = S.id           
            INNER JOIN usuarios U ON U.id = S.usuario_id
            WHERE S.id = ?
            GROUP BY S.id
        `,
        [idSala]
    );

    if (entry.length === 0) {
        return null;
    }

    // Obtenemos el array de los comentarios de la sala
    const [comentarios] = await pool.query(
        `
            SELECT
                votos_salas.comentario,
                votos_salas.voto,
                votos_salas.createdAt,
                votos_salas.id,
                grupos.id AS grupoVotaId,
                grupos.nombre AS grupoVotaName,
                usuarios.avatar AS grupoAvatar
            FROM votos_salas
            JOIN grupos ON grupos.id = votos_salas.grupoVota
            JOIN usuarios ON usuarios.id = grupos.usuario_id
            WHERE votos_salas.salaVotada = ?
        `,
        [idSala]
    );

    // Agregamos el array de los media del grupo.
    entry[0].comentarios = comentarios;

    // Obtenemos el array de los generos del grupo.
    const [genero] = await pool.query(
        `SELECT 
                generoId,
                (SELECT nombre FROM generos_musicales WHERE generos_musicales.id = generos_salas.generoId) AS generoName
            FROM generos_salas
            WHERE salaId = ?`,
        [idSala]
    );
    // Agregamos el array de los generos del grupo.
    entry[0].genero = genero;

    // Obtenemos el array de los archivos de la sala.
    const [photos] = await pool.query(
        `SELECT id, name, es_principal FROM sala_fotos WHERE salaId = ?`,
        [idSala]
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

    const [reservations] = await pool.query(
        `
            SELECT
                R.grupo_id,
                G.nombre AS grupo,
                R.fecha,
                R.confirmada
            FROM reservas R
            LEFT JOIN grupos G ON G.id = R.grupo_id
            WHERE R.sala_id = ?
        `,
        [idSala]
    );

    return {
        ...entry[0],
        comentarios,
        genero,
        fotos,
        pdf,
        reservations,
    };
};

export default selectSalaByIdService;
