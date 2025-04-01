import getPool from '../../database/getPool.js';

const listAgenciasService = async (filters) => {
    const pool = await getPool();

    // Consulta principal para obtener las agencias con filtros y paginación
    let query = `
    SELECT 
        a.id, 
        a.usuario_id, 
        a.nombre, 
        a.published,
        a.hidden,
        a.createdAt,
        a.updatedAt,
        (SELECT avatar FROM usuarios WHERE usuarios.id = a.usuario_id) AS avatar,
        (SELECT provincia FROM provincias WHERE provincias.id = a.provincia) AS provincia,
        (SELECT GROUP_CONCAT(especialidad_id) FROM agencias_especialidades WHERE agencias_especialidades.agencia_id = a.id) AS especialidades,
        GROUP_CONCAT(DISTINCT ae.especialidad SEPARATOR ', ') AS especNombres
    FROM 
        agencias a
    LEFT JOIN provincias ON provincias.id = a.provincia
    LEFT JOIN agencias_especialidades aes ON aes.agencia_id = a.id
    LEFT JOIN agencias_especialidad ae ON ae.id = aes.especialidad_id   
    WHERE 1=1 AND a.published = 1 AND a.hidden = 0
    `;

    const queryParams = [];

    // Filtro por nombre (si está presente)
    if (filters.nombre && filters.nombre.trim() !== '') {
        query += ' AND a.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.especialidades && filters.especialidades !== '') {
        const especialidadesArray = filters.especialidades.split(',');
        query += ` AND aes.especialidad_id IN (${especialidadesArray.map(() => '?').join(',')})`;
        queryParams.push(...especialidadesArray);
    }

    // Filtro por provincia (si está presente)
    if (filters.provincia && filters.provincia.trim() !== '') {
        query += ' AND a.provincia = ?';
        queryParams.push(filters.provincia);
    }

    query += ' GROUP BY a.id, a.nombre, a.usuario_id, a.provincia';

    // Ordenamiento seguro
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
    const pageSize = filters.pageSize ? parseInt(filters.pageSize, 10) : 12;
    const offset = (page - 1) * pageSize;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(pageSize, offset);

    // Ejecutar consulta principal
    const [rows] = await pool.query(query, queryParams);

    // Consulta para obtener el conteo total de agencias sin paginación
    // Se asegura que todos los JOINs se coloquen antes del WHERE
    let countQuery = `
    SELECT COUNT(DISTINCT a.id) AS total
    FROM agencias a
    LEFT JOIN provincias ON provincias.id = a.provincia
    `;
    const countQueryParams = [];

    if (filters.especialidades && filters.especialidades.trim() !== '') {
        // INNER JOIN para filtrar las agencias que tengan la especialidad indicada
        countQuery += ` INNER JOIN agencias_especialidades aes ON aes.agencia_id = a.id `;
    }

    countQuery += `
    WHERE a.published = 1 AND a.hidden = 0
    `;

    if (filters.nombre && filters.nombre.trim() !== '') {
        countQuery += ' AND a.nombre LIKE ?';
        countQueryParams.push(`%${filters.nombre}%`);
    }

    if (filters.provincia && filters.provincia.trim() !== '') {
        countQuery += ' AND a.provincia = ?';
        countQueryParams.push(filters.provincia);
    }

    if (filters.especialidades && filters.especialidades !== '') {
        const especialidadesArray = filters.especialidades.split(',');
        countQuery += ` AND aes.especialidad_id IN (${especialidadesArray.map(() => '?').join(',')})`;
        countQueryParams.push(...especialidadesArray);
    }

    const [[countResult]] = await pool.query(countQuery, countQueryParams);

    const result = rows.map((row) => ({
        ...row,
    }));

    return {
        result,
        total: countResult.total,
    };
};

export default listAgenciasService;
