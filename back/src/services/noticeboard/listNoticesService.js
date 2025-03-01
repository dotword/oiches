import getPool from '../../database/getPool.js';

const listNoticesService = async (filters) => {
    try {
        const pool = await getPool();

        let query = `
        SELECT
            N.id,
            N.usuario_id,
            N.salaGrupo_id,
            N.category_id,
            C.nombre AS category,
            P.nombre AS parentCategory,
            PR.provincia AS provincia,
            PR.id AS provinciaId,
            N.titulo,
            N.createdAt,
            U.roles AS ownerRole,
            U.username AS userName
        FROM noticeboard N
        LEFT JOIN usuarios U ON U.id = N.usuario_id
        LEFT JOIN category_noticeboard C ON C.id = N.category_id
        LEFT JOIN category_noticeboard P ON P.id = C.parent_id
        LEFT JOIN provincias PR ON PR.id = N.provincia
        WHERE N.estado = 'aprobado'
        `;

        const queryParams = [];

        // Filtros
        if (filters.ownerRole && filters.ownerRole.trim() !== '') {
            query += ' AND C.id = ?';
            queryParams.push(filters.ownerRole);
        }
        if (filters.categoria && filters.categoria.trim() !== '') {
            query += ' AND C.id = ?';
            queryParams.push(filters.categoria);
        }
        if (filters.provincia && filters.provincia.trim() !== '') {
            query += ' AND PR.id = ?';
            queryParams.push(filters.provincia);
        }

        // Filtrado por géneros (usando subquery con UNION)
        if (filters.generos && filters.generos.trim() !== '') {
            // Suponemos que filters.generos es una lista separada por comas (ej: "Rock,Pop")
            const generosArray = filters.generos
                .split(',')
                .map((g) => g.trim())
                .filter((g) => g !== '');
            if (generosArray.length > 0) {
                query += ` AND N.salaGrupo_id IN (
                SELECT GG.grupoId FROM generos_grupos GG
                JOIN generos_musicales GM ON GM.id = GG.generoId
                WHERE GM.id IN (${generosArray.map(() => '?').join(',')})
                UNION
                SELECT GS.salaId FROM generos_salas GS
                JOIN generos_musicales GM ON GM.id = GS.generoId
                WHERE GM.id IN (${generosArray.map(() => '?').join(',')})
            )`;
                // Se agregan los parámetros dos veces (uno para cada subconsulta)
                queryParams.push(...generosArray, ...generosArray);
            }
        }
        // Ordenación por createdAt
        query += ` ORDER BY COALESCE(N.createdAt, NOW()) DESC`;

        // Paginación
        const page = filters.page ? parseInt(filters.page, 10) : 1;
        let pageSize =
            filters.pageSize !== '*' ? parseInt(filters.pageSize, 10) : null;

        if (pageSize) {
            const offset = (page - 1) * pageSize;
            query += ` LIMIT ? OFFSET ?`;
            queryParams.push(pageSize, offset);
        }

        // Ejecutar la consulta principal con los filtros y paginación
        const [rows] = await pool.query(query, queryParams);

        // Obtener los géneros musicales por cada noticia
        for (let notice of rows) {
            let generos = [];

            if (notice.ownerRole === 'grupo') {
                const [generosGrupo] = await pool.query(
                    `SELECT GM.id AS generoId, GM.nombre AS generoName
                    FROM generos_grupos GG
                    JOIN generos_musicales GM ON GM.id = GG.generoId
                    WHERE GG.grupoId = ?`,
                    [notice.salaGrupo_id]
                );
                generos = generosGrupo;
            } else if (notice.ownerRole === 'sala') {
                const [generosSala] = await pool.query(
                    `SELECT GM.id AS generoId, GM.nombre AS generoName
                    FROM generos_salas GS
                    JOIN generos_musicales GM ON GM.id = GS.generoId
                    WHERE GS.salaId = ?`,
                    [notice.salaGrupo_id]
                );
                generos = generosSala;
            }

            // Agregar los géneros a la noticia
            notice.genero = generos;
        }

        // Consulta para obtener el total de notices sin paginación
        const [countResult] = await pool.query(
            `SELECT COUNT(DISTINCT N.id) AS total
            FROM noticeboard N
            LEFT JOIN usuarios U ON U.id = N.usuario_id
            WHERE N.estado = 'aprobado'`,
            []
        );
        const total = countResult[0].total;

        return { rows, total };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default listNoticesService;
