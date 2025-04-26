import getPool from '../../database/getPool.js';
import path from 'path';

const listContestInscriptionsService = async (filters) => {
    try {
        const pool = await getPool();

        // Consulta principal
        let query = `
            SELECT 
                pi.*,
                g.nombre AS grupo_nombre,
                g.provincia AS provincia_id,
                g.usuario_id AS usuario_id,
                p.provincia AS provincia_nombre,
                (
                    SELECT GROUP_CONCAT(gm.nombre SEPARATOR ', ')
                    FROM generos_grupos gg
                    JOIN generos_musicales gm ON gg.generoId = gm.id
                    WHERE gg.grupoId = pi.id
                ) AS generos,
                (SELECT COUNT(id) FROM contest_votes WHERE contest_votes.project_id = pi.id) AS number_votes 
            FROM proyectos_inscritos pi
            LEFT JOIN grupos g ON pi.id = g.id
            JOIN provincias p ON g.provincia = p.id
            WHERE 1=1 AND pi.projectAcepted = 1
        `;

        // Consulta de conteo
        let countQuery = `
            SELECT COUNT(DISTINCT pi.id) AS total
            FROM proyectos_inscritos pi
            LEFT JOIN grupos g ON pi.id = g.id
            WHERE 1=1 AND pi.projectAcepted = 1
        `;

        const queryParams = [];
        const countQueryParams = [];

        // Filtro por nombre
        if (filters.name && filters.name.trim() !== '') {
            query += ' AND g.nombre LIKE ?';
            countQuery += ' AND g.nombre LIKE ?';
            const nameFilter = `%${filters.name}%`;
            queryParams.push(nameFilter);
            countQueryParams.push(nameFilter);
        }

        // Ordenamiento
        query += ` ORDER BY number_votes DESC, grupo_nombre ASC`;

        // Paginación
        const page = filters.page ? parseInt(filters.page, 10) : 1;
        let pageSize = filters.pageSize;

        if (pageSize !== '*' && pageSize) {
            pageSize = parseInt(pageSize, 10);
            const offset = (page - 1) * pageSize;
            query += ` LIMIT ? OFFSET ?`;
            queryParams.push(pageSize, offset);
        }

        // Ejecutar consulta principal
        const [rows] = await pool.query(query, queryParams);

        // Ejecutar conteo total con filtros aplicados
        const [countResult] = await pool.query(countQuery, countQueryParams);
        const total = countResult[0].total;

        // Consulta para obtener las fotos agrupadas por grupo
        const [photos] = await pool.query(`
        SELECT id, name, grupoId, es_principal 
        FROM grupo_fotos
    `);

        // Agrupar las fotos por grupo excluyendo los archivos PDF
        const groupedPhotos = photos.reduce((acc, photo) => {
            if (path.extname(photo.name).toLowerCase() !== '.pdf') {
                if (!acc[photo.grupoId]) {
                    acc[photo.grupoId] = [];
                }
                acc[photo.grupoId].push({
                    id: photo.id,
                    name: photo.name,
                    main: photo.es_principal,
                });
            }
            return acc;
        }, {});

        // Añadir las fotos correspondientes a cada grupo
        const result = rows.map((row) => ({
            ...row,
            fotos: groupedPhotos[row.id] || [],
        }));

        return { result, total };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listContestInscriptionsService;
