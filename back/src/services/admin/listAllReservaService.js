import getPool from '../../database/getPool.js';

const listAllReservaService = async (filters) => {
    try {
        const pool = await getPool();

        let query = `
        SELECT reservas.*, grupos.nombre AS grupo_nombre, salas.nombre AS sala_nombre, conciertos.id AS concierto
            FROM reservas
            LEFT JOIN grupos ON reservas.grupo_id = grupos.id
            LEFT JOIN salas ON reservas.sala_id = salas.id
            LEFT JOIN conciertos ON conciertos.reservaId = reservas.id
        WHERE 1=1
        `;

        const queryParams = [];

        if (filters.salaname && filters.salaname.trim() !== '') {
            query += ' AND salas.nombre LIKE ?';
            queryParams.push(`%${filters.salaname}%`);
        }

        if (filters.gruponame && filters.gruponame.trim() !== '') {
            query += ' AND grupos.nombre LIKE ?';
            queryParams.push(`%${filters.gruponame}%`);
        }

        if (filters.confirm && filters.confirm.trim() !== '') {
            query += ' AND reservas.confirmada LIKE ?';
            queryParams.push(`%${filters.confirm}%`);
        }

        const orderField =
            filters.orderField &&
            ['fecha', 'createdAt'].includes(filters.orderField)
                ? filters.orderField
                : 'fecha'; // Campo predeterminado
        const orderDirection =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';

        query += ` ORDER BY reservas.${orderField} ${orderDirection}`;
        // const validOrderFields = ['fecha', 'createdAt'];
        // const orderField = validOrderFields.includes(filters.orderField)
        //     ? filters.orderField
        //     : 'fecha'; // Campo por defecto

        // // Dirección de orden
        // const orderDirection =
        //     filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // query += ` ORDER BY reservas.${orderField} ${orderDirection}`;

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
        SELECT COUNT(DISTINCT reservas.id) AS total
            FROM reservas
        LEFT JOIN grupos ON reservas.grupo_id = grupos.id
        LEFT JOIN salas ON reservas.sala_id = salas.id
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

export default listAllReservaService;
