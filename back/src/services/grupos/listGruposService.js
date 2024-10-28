import getPool from '../../database/getPool.js';
import path from 'path';

export async function listGruposService(filters) {
    const pool = await getPool();

    // Consulta principal para obtener los grupos con filtros
    let query = `
    SELECT 
        g.id, 
        g.nombre, 
        g.usuario_id,
        g.createdAt,
        g.updatedAt,
        p.provincia AS provincia_nombre,
        COALESCE(SUM(v.voto), 0) AS votos,
        (SELECT AVG(voto) FROM votos_grupos WHERE votos_grupos.grupoVotado = g.id) AS media_votos,
        (SELECT GROUP_CONCAT(generoId) FROM generos_grupos WHERE generos_grupos.grupoId = g.id) AS generos,
        GROUP_CONCAT(DISTINCT gm.nombre SEPARATOR ', ') AS generoNombres
    FROM grupos g
    JOIN provincias p ON g.provincia = p.id
    JOIN generos_grupos gg ON gg.grupoId = g.id
    JOIN generos_musicales gm ON gg.generoId = gm.id
    LEFT JOIN grupo_fotos gf ON g.id = gf.grupoId
    LEFT JOIN votos_grupos v ON g.id = v.grupoVotado
    WHERE 1=1
    `;

    const queryParams = [];

    // Aplicar filtros dinámicos (verificamos que los filtros no estén vacíos)
    if (filters.nombre && filters.nombre.trim() !== '') {
        query += ' AND g.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.provincia && filters.provincia.trim() !== '') {
        query += ' AND p.provincia LIKE ?';
        queryParams.push(`%${filters.provincia}%`);
    }

    if (filters.generos && filters.generos !== '') {
        const generosArray = filters.generos.split(','); // Si generos es una lista separada por comas
        query += ` AND gg.generoId IN (${generosArray.map(() => '?').join(',')})`;
        queryParams.push(...generosArray);
    }

    query += ' GROUP BY g.id, g.nombre, g.usuario_id, p.provincia';

    // Ordenamiento dinámico basado en los parámetros proporcionados
    if (filters.order && filters.field) {
        const orderDirection =
            filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        query += ` ORDER BY media_votos ${orderDirection}, updatedAt ${orderDirection}`;
    } else {
        query += ' ORDER BY media_votos DESC, updatedAt DESC'; // Ordenamiento por defecto
    }

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
    SELECT COUNT(DISTINCT g.id) AS total
    FROM grupos g
    LEFT JOIN provincias p ON g.provincia = p.id
    LEFT JOIN generos_grupos gg ON gg.grupoId = g.id
    WHERE 1=1
    `;

    // Aplicar los mismos filtros a la consulta de conteo
    const countQueryParams = [];
    if (filters.nombre && filters.nombre.trim() !== '') {
        countQuery += ' AND g.nombre LIKE ?';
        countQueryParams.push(`%${filters.nombre}%`);
    }
    if (filters.provincia && filters.provincia.trim() !== '') {
        countQuery += ' AND p.provincia LIKE ?';
        countQueryParams.push(`%${filters.provincia}%`);
    }
    if (filters.generos && filters.generos !== '') {
        const generosArray = filters.generos.split(',');
        countQuery += ` AND gg.generoId IN (${generosArray.map(() => '?').join(',')})`;
        countQueryParams.push(...generosArray);
    }

    // Ejecutar la consulta de conteo
    const [countResult] = await pool.query(countQuery, countQueryParams);
    const total = countResult[0].total;

    // Consulta para obtener las fotos agrupadas por grupo
    const [photos] = await pool.query(`
        SELECT id, name, grupoId, es_principal 
        FROM grupo_fotos
    `);

    // Agrupar las fotos por grupo excluyendo los archivos PDF
    const groupedPhotos = photos.reduce((acc, photo) => {
        if (path.extname(photo.name).toLowerCase() !== '.pdf') {
            if (!acc[photo.grupoId]) {
                acc[photo.grupoId] = [];
            }
            acc[photo.grupoId].push({
                id: photo.id,
                name: photo.name,
                main: photo.es_principal,
            });
        }
        return acc;
    }, {});

    // Añadir las fotos correspondientes a cada grupo
    const result = rows.map((row) => ({
        ...row,
        fotos: groupedPhotos[row.id] || [],
    }));

    return { rows: result, total };
}
