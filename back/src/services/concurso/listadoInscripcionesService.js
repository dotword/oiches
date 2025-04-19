import getPool from '../../database/getPool.js';

const listadoInscripcionesService = async (filters) => {
    try {
        const pool = await getPool();

        let query = `
        SELECT proyectos_inscritos.*, grupos.nombre AS grupo_nombre
            FROM proyectos_inscritos
            LEFT JOIN grupos ON proyectos_inscritos.id = grupos.id
        WHERE 1=1
        `;

        const queryParams = [];

        if (filters.name && filters.name.trim() !== '') {
            query += ' AND (grupos.nombre LIKE ? )';
            queryParams.push(`%${filters.name}%`);
        }

        if (filters.acepted && filters.acepted.trim() !== '') {
            query += ' AND proyectos_inscritos.projectAcepted LIKE ?';
            queryParams.push(`%${filters.acepted}%`);
        }

        // Ordenamiento dinámico basado en los parámetros proporcionados
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

        // Ejecutar la consulta principal con los filtros y paginación
        const [rows] = await pool.query(query, queryParams);

        // Consulta para obtener el total de grupos sin paginación
        let countQuery = `
            SELECT COUNT(DISTINCT proyectos_inscritos.id) AS total
            FROM proyectos_inscritos
            WHERE 1=1
            `;

        // Aplicar los mismos filtros a la consulta de conteo
        const countQueryParams = [...queryParams];

        const [countResult] = await pool.query(countQuery, countQueryParams);
        const total = countResult[0].total;

        return { rows, total };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listadoInscripcionesService;
