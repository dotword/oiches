import getPool from '../../database/getPool.js';

const listAgenciasService = async (filters) => {
    const pool = await getPool();

    // Consulta principal para obtener las agencias con filtros y paginación
    let query = `
    SELECT 
        agencias.id, 
        agencias.usuario_id, 
        agencias.nombre, 
        agencias.published,
        agencias.hidden,
        agencias.createdAt,
        agencias.updatedAt,
        (SELECT avatar FROM usuarios WHERE usuarios.id = agencias.usuario_id) AS avatar,
        (SELECT provincia FROM provincias WHERE provincias.id = agencias.provincia) AS provincia
    FROM 
        agencias 
    LEFT JOIN provincias ON provincias.id = agencias.provincia   
    WHERE 1=1 AND agencias.published = 1 AND agencias.hidden = 0
    `;

    const queryParams = [];

    // Filtro por nombre (si está presente)
    if (filters.nombre && filters.nombre.trim() !== '') {
        query += ' AND agencias.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    // Filtro por provincia (si está presente)
    if (filters.provincia && filters.provincia.trim() !== '') {
        query += ' AND agencias.provincia = ?';
        queryParams.push(filters.provincia);
    }
    query +=
        ' GROUP BY agencias.id, agencias.nombre, agencias.usuario_id, agencias.provincia';

    // ORDERBY
    const allowedFields = ['createdAt', 'nombre'];
    if (
        filters.order &&
        filters.field &&
        allowedFields.includes(filters.field)
    ) {
        const orderDirection =
            filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query += ` ORDER BY ${filters.field} ${orderDirection}`;
    } else {
        query += ' ORDER BY a.createdAt DESC';
    }

    // Paginación
    const page = filters.page ? parseInt(filters.page, 10) : 1;
    const pageSize = filters.pageSize ? parseInt(filters.pageSize, 10) : 10;
    const offset = (page - 1) * pageSize;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(pageSize, offset);

    // Ejecutar consulta principal
    const [rows] = await pool.query(query, queryParams);

    // Consulta para obtener el conteo total de agencias sin paginación
    let countQuery = `
    SELECT COUNT(DISTINCT agencias.id) AS total
    FROM 
        agencias 
    LEFT JOIN provincias ON provincias.id = agencias.provincia      
    WHERE 
        1=1
    `;

    // Aplicar los mismos filtros a la consulta de conteo
    const countQueryParams = [];
    if (filters.nombre && filters.nombre.trim() !== '') {
        countQuery += ' AND agencias.nombre LIKE ?';
        countQueryParams.push(`%${filters.nombre}%`);
    }

    if (filters.provincia && filters.provincia.trim() !== '') {
        countQuery += ' AND agencias.provincia = ?';
        countQueryParams.push(filters.provincia);
    }
    const [[countResult]] = await pool.query(countQuery, countQueryParams);

    // Añadir las fotos correspondientes a cada grupo
    const result = rows.map((row) => ({
        ...row,
    }));

    return {
        result,
        total: countResult.total,
    };
};

export default listAgenciasService;
