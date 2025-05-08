import getPool from '../../database/getPool.js';

const listadoInscripcionesService = async (filters) => {
    try {
        const pool = await getPool();

        // Consulta principal
        let query = `
            SELECT 
                pi.*,
                g.nombre AS grupo_nombre
            FROM proyectos_inscritos pi
            LEFT JOIN grupos g ON pi.id = g.id
            WHERE 1=1
        `;

        // Consulta de conteo
        let countQuery = `
            SELECT COUNT(DISTINCT pi.id) AS total
            FROM proyectos_inscritos pi
            LEFT JOIN grupos g ON pi.id = g.id
            WHERE 1=1
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

        // Filtro por aceptación
        if (filters.acepted && filters.acepted.trim() !== '') {
            query += ' AND pi.projectAcepted = ?';
            countQuery += ' AND pi.projectAcepted = ?';
            const aceptedValue = parseInt(filters.acepted, 10);
            queryParams.push(aceptedValue);
            countQueryParams.push(aceptedValue);
        }

        // Ordenamiento
        const orderDirection =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';
        query += ` ORDER BY createdAt ${orderDirection}`;

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

export default listadoInscripcionesService;
