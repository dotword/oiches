import getPool from '../../database/getPool.js';

const getAllNoticesService = async (filters) => {
    try {
        const pool = await getPool();

        let query = `
        SELECT noticeboard.*,
            usuarios.username AS userName,
            usuarios.roles AS role,
            G.nombre AS grupo,
            S.nombre AS sala
        FROM noticeboard
        LEFT JOIN usuarios ON usuarios.id = noticeboard.usuario_id
        LEFT JOIN grupos G ON G.id = noticeboard.salaGrupo_id AND usuarios.roles = 'grupo'
        LEFT JOIN salas S ON S.id = noticeboard.salaGrupo_id AND usuarios.roles = 'sala'
        WHERE 1=1
        `;

        const queryParams = [];

        // Filtros
        if (filters.estado && filters.estado.trim() !== '') {
            query += ' AND noticeboard.estado LIKE ?';
            queryParams.push(`%${filters.estado}%`);
        }

        // Ordenamiento por createdAt
        const orderField =
            filters.orderField && ['createdAt'].includes(filters.orderField)
                ? filters.orderField
                : 'createdAt'; // Si no se pasa un orderField válido, ordena por createdAt por defecto

        const orderDirection =
            filters.order &&
            ['ASC', 'DESC'].includes(filters.order.toUpperCase())
                ? filters.order.toUpperCase()
                : 'DESC'; // Si no se pasa una dirección de orden válida, usa DESC por defecto

        query += ` ORDER BY noticeboard.${orderField} ${orderDirection}`;

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

        // Consulta para obtener el total de notices sin paginación
        let countQuery = `
        SELECT COUNT(DISTINCT noticeboard.id) AS total
            FROM noticeboard
        LEFT JOIN usuarios ON usuarios.id = noticeboard.usuario_id
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

export default getAllNoticesService;
