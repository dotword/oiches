import getPool from '../../database/getPool.js';

const selectNoticeByIdService = async (idNotice) => {
    const pool = await getPool();

    const [notices] = await pool.query(
        `
        SELECT 
            N.id,
            N.usuario_id,
            N.salaGrupo_id,
            COALESCE(S.nombre, G.nombre) AS nombreSalaGrupo,
            N.category_id,
            C.nombre AS category,
            P.nombre AS parentCategory,
            PR.provincia AS provincia,
            PR.id AS provinciaId,
            N.titulo,
            N.descripcion,
            N.estado,
            U.roles AS ownerRole,
            U.email,
            N.createdAt
        FROM noticeboard N
        LEFT JOIN salas S ON S.id = N.salaGrupo_id
        LEFT JOIN grupos G ON G.id = N.salaGrupo_id
        LEFT JOIN category_noticeboard C ON C.id = N.category_id
        LEFT JOIN category_noticeboard P ON P.id = C.parent_id
        LEFT JOIN provincias PR ON PR.id = N.provincia
        LEFT JOIN usuarios U ON U.id = N.usuario_id
        WHERE N.id = ?
        LIMIT 1
        `,
        [idNotice]
    );

    if (notices.length === 0) {
        return null;
    }
    const notice = notices[0];

    // Obtener los géneros musicales dependiendo del tipo de propietario
    let generos = [];

    if (notice.ownerRole === 'grupo') {
        const [generosGrupo] = await pool.query(
            `SELECT 
                GG.generoId, 
                GM.nombre AS generoName
            FROM generos_grupos GG
            JOIN generos_musicales GM ON GM.id = GG.generoId
            WHERE GG.grupoId = ?`,
            [notice.salaGrupo_id]
        );
        generos = generosGrupo;
    } else if (notice.ownerRole === 'sala') {
        const [generosSala] = await pool.query(
            `SELECT 
                GS.generoId, 
                GM.nombre AS generoName
            FROM generos_salas GS
            JOIN generos_musicales GM ON GM.id = GS.generoId
            WHERE GS.salaId = ?`,
            [notice.salaGrupo_id]
        );
        generos = generosSala;
    }

    // Agregar los géneros a la noticia
    notice.genero = generos;

    return notice;
};

export default selectNoticeByIdService;
