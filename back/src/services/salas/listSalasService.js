import getPool from '../../database/getPool.js';

export async function listSalasService(filters) {
    const pool = await getPool();

    // Consulta para obtener las salas con paginación
    let query = `
    SELECT 
        salas.id, 
        salas.usuario_id, 
        salas.nombre, 
        salas.createdAt,
        (SELECT provincia FROM provincias WHERE provincias.id = salas.provincia) AS provincia,
        (SELECT name FROM sala_fotos WHERE sala_fotos.salaId = salas.id LIMIT 1) AS primera_foto,
        (SELECT AVG(voto) FROM votos_salas WHERE votos_salas.salaVotada = salas.id) AS media_votos,
        (SELECT GROUP_CONCAT(generoId) FROM generos_salas WHERE generos_salas.SalaId = salas.id) AS generos,
        GROUP_CONCAT(gm.nombre SEPARATOR ', ') AS generoNombres
    FROM 
        salas 
    LEFT JOIN provincias ON provincias.id = salas.provincia
    LEFT JOIN generos_salas gs ON gs.salaId = salas.id
    LEFT JOIN generos_musicales gm ON gs.generoId = gm.id        
    WHERE 
        1=1
    `;

    const queryParams = [];

    // Filtros específicos
    if (filters.nombre) {
        query += ' AND salas.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.genero) {
        query += ' AND gs.generoId = ?';
        queryParams.push(filters.genero);
    }

    if (filters.provincia) {
        query += ' AND salas.provincia = ?';
        queryParams.push(filters.provincia);
    }

    query += ' GROUP BY salas.id';

    // Ordenamiento por media de votos siempre
    if (filters.order && filters.field) {
        const orderField =
            filters.field === 'media_votos' ? 'media_votos' : 'salas.nombre';
        const orderDirection =
            filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query += ` ORDER BY ${orderField} ${orderDirection}`;
    } else {
        // Default order by media votes descending
        query += ' ORDER BY media_votos DESC';
    }

    // Agregar paginación
    const page = filters.page ? parseInt(filters.page, 10) : 1;
    let pageSize = filters.pageSize;

    if (pageSize === '*') {
        // Omitir paginación si pageSize es '*'
        queryParams.push(); // Añadir un valor vacío para los parámetros
    } else {
        pageSize = pageSize ? parseInt(pageSize, 10) : 10;
        const offset = (page - 1) * pageSize;
        query += ` LIMIT ? OFFSET ?`;
        queryParams.push(pageSize, offset);
    }

    // Ejecutar consulta para obtener las salas
    const [rows] = await pool.query(query, queryParams);

    // Consulta para obtener el conteo total de salas
    let countQuery = `
    SELECT COUNT(*) AS total
    FROM 
        salas 
    LEFT JOIN provincias ON provincias.id = salas.provincia
    LEFT JOIN generos_salas gs ON gs.salaId = salas.id
    LEFT JOIN generos_musicales gm ON gs.generoId = gm.id        
    WHERE 
        1=1
    `;

    // Aplicar los mismos filtros a la consulta de conteo
    if (filters.nombre) {
        countQuery += ' AND salas.nombre LIKE ?';
    }

    if (filters.genero) {
        countQuery += ' AND gs.generoId = ?';
    }

    if (filters.provincia) {
        countQuery += ' AND salas.provincia = ?';
    }

    const [[countResult]] = await pool.query(
        countQuery,
        queryParams.slice(0, -2)
    );

    return {
        rows,
        total: countResult.total,
    };
}
