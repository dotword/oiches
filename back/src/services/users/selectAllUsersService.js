import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const selectAllUsersService = async (filters) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el email proporcionado.
    let query = `
        SELECT 
            u.id AS usuario_id, 
            u.username, 
            u.active, 
            u.roles, 
            u.createdAt,
            u.deletedAt,
            salas.id AS sala_id,
            salas.nombre AS sala_nombre,
            salas.updatedAt AS sala_updatedAt,
            grupos.id AS grupo_id,
            grupos.nombre AS grupo_nombre,
            grupos.updatedAt AS grupo_updatedAt,
            prov_grupo.provincia AS provincia_grupo_nombre,
            prov_sala.provincia AS provincia_sala_nombre
        FROM 
            usuarios u  
        LEFT JOIN 
            salas ON salas.usuario_id = u.id
        LEFT JOIN 
            grupos ON grupos.usuario_id = u.id
        LEFT JOIN provincias prov_grupo ON grupos.provincia = prov_grupo.id
        LEFT JOIN provincias prov_sala ON salas.provincia = prov_sala.id     
        WHERE 
            1=1
        `;

    const queryParams = [];

    // Aplicar filtros dinámicos (verificamos que los filtros no estén vacíos)
    if (filters.username && filters.username.trim() !== '') {
        query += ' AND u.username LIKE ?';
        queryParams.push(`%${filters.username}%`);
    }
    if (filters.active && filters.active.trim() !== '') {
        query += ' AND u.active LIKE ?';
        queryParams.push(`${filters.active}`);
    }
    if (filters.roles && filters.roles.trim() !== '') {
        query += ' AND u.roles LIKE ?';
        queryParams.push(`${filters.roles}`);
    }
    if (filters.salaname && filters.salaname.trim() !== '') {
        query += ' AND salas.nombre LIKE ?';
        queryParams.push(`%${filters.salaname}%`);
    }
    if (filters.gruponame && filters.gruponame.trim() !== '') {
        query += ' AND grupos.nombre LIKE ?';
        queryParams.push(`%${filters.gruponame}%`);
    }
    if (filters.provincia && filters.provincia.trim() !== '') {
        query +=
            ' AND (prov_grupo.provincia LIKE ? OR prov_sala.provincia LIKE ?)';
        queryParams.push(`%${filters.provincia}%`, `%${filters.provincia}%`);
    }

    query += ' GROUP BY u.username, salas.id, grupos.id';

    // Ordenamiento dinámico basado en los parámetros proporcionados
    const orderDirection =
        filters.order && filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
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
    SELECT COUNT(DISTINCT usuarios.id) AS total
    FROM usuarios
    WHERE 1=1
    `;

    // Aplicar los mismos filtros a la consulta de conteo
    const countQueryParams = [];
    if (filters.usuarios && filters.usuarios.trim() !== '') {
        countQuery += ' AND usuarios.username LIKE ?';
        countQueryParams.push(`%${filters.usuarios}%`);
    }

    // Ejecutar la consulta de conteo
    const [countResult] = await pool.query(countQuery, countQueryParams);
    const total = countResult[0].total;

    return { rows, total };
};

export default selectAllUsersService;
