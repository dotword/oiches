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
            salas.createdAt AS sala_createdAt,
            salas.published AS sala_published,
            grupos.id AS grupo_id,
            grupos.nombre AS grupo_nombre,
            grupos.createdAt AS grupo_createdAt,
            grupos.published AS grupo_published,
            agencias.id AS agencia_id,
            agencias.nombre AS agencia_nombre,
            agencias.updatedAt AS agencia_updatedAt,
            agencias.published AS agencia_published,
            prov_grupo.provincia AS provincia_grupo_nombre,
            prov_sala.provincia AS provincia_sala_nombre,
            prov_agencia.provincia AS provincia_agencia_nombre
        FROM 
            usuarios u  
        LEFT JOIN 
            salas ON salas.usuario_id = u.id
        LEFT JOIN 
            grupos ON grupos.usuario_id = u.id
        LEFT JOIN 
            agencias ON agencias.usuario_id = u.id
        LEFT JOIN provincias prov_grupo ON grupos.provincia = prov_grupo.id
        LEFT JOIN provincias prov_sala ON salas.provincia = prov_sala.id
        LEFT JOIN provincias prov_agencia ON agencias.provincia = prov_agencia.id        
        WHERE 1=1
        `;

    const queryParams = [];

    // Aplicar filtros dinámicos (verificamos que los filtros no estén vacíos)
    if (filters.username && filters.username.trim() !== '') {
        query += ' AND u.username LIKE ?';
        queryParams.push(`%${filters.username}%`);
    }
    if (filters.active && filters.active.trim() !== '') {
        query += ' AND u.active = ?';
        queryParams.push(filters.active);
    }
    if (filters.roles && filters.roles.trim() !== '') {
        query += ' AND u.roles LIKE ?';
        queryParams.push(`${filters.roles}`);
    }
    if (filters.published && filters.published.trim() !== '') {
        query +=
            ' AND (grupos.published = ? OR salas.published = ? OR agencias.published = ?)';
        const publishedValue = parseInt(filters.published, 10);
        queryParams.push(publishedValue, publishedValue, publishedValue);
    }
    if (filters.provincia && filters.provincia.trim() !== '') {
        query +=
            ' AND (prov_grupo.provincia LIKE ? OR prov_sala.provincia LIKE ? OR prov_agencia.provincia LIKE ?)';
        queryParams.push(
            `%${filters.provincia}%`,
            `%${filters.provincia}%`,
            `%${filters.provincia}%`
        );
    }
    if (filters.name && filters.name.trim() !== '') {
        query +=
            ' AND (grupos.nombre LIKE ? OR salas.nombre LIKE ? OR agencias.nombre LIKE ?)';
        queryParams.push(
            `%${filters.name}%`,
            `%${filters.name}%`,
            `%${filters.name}%`
        );
    }
    query += ' GROUP BY u.username, salas.id, grupos.id, agencias.id';

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
