import getPool from '../../database/getPool.js';

const adminListContestVotersService = async (filters) => {
    try {
        const pool = await getPool();

        // Consulta principal
        let query = `
          SELECT 
                voters.*,
                grupos.nombre AS grupo_nombre,
                contest_votes.id AS vote_id
            FROM voters
            LEFT JOIN 
                contest_votes ON voters.id = contest_votes.voter_id
            LEFT JOIN 
                proyectos_inscritos ON contest_votes.project_id = proyectos_inscritos.id
            LEFT JOIN 
                grupos ON proyectos_inscritos.id = grupos.id
            WHERE 1=1
        `;

        // Consulta de conteo
        let countQuery = `
            SELECT COUNT(DISTINCT voters.id) AS total
            FROM voters
            WHERE 1=1
        `;

        const queryParams = [];
        const countQueryParams = [];

        // Filtro por email
        if (filters.email && filters.email.trim() !== '') {
            query += ' AND voters.email LIKE ?';
            countQuery += ' AND voters.email LIKE ?';
            const emailFilter = `%${filters.email}%`;
            queryParams.push(emailFilter);
            countQueryParams.push(emailFilter);
        }

        // Ordenamiento
        query += ` ORDER BY created_at DESC`;

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

        return { rows, total };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default adminListContestVotersService;
