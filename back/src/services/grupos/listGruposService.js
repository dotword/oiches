// import getPool from '../../database/getPool.js';
// import path from 'path';

// export async function listGruposService(filters) {
//     const pool = await getPool();

//     let query = `
//     SELECT
//         g.id,
//         g.nombre,
//         g.usuario_id,
//         g.createdAt,
//         p.provincia AS provincia_nombre,
//         COALESCE(SUM(v.voto), 0) AS votos,
//         (SELECT AVG(voto) FROM votos_grupos WHERE votos_grupos.grupoVotado = g.id) AS media_votos,
//         (SELECT GROUP_CONCAT(generoId) FROM generos_grupos WHERE generos_grupos.grupoId = g.id) AS generos,
//         GROUP_CONCAT(DISTINCT gm.nombre SEPARATOR ', ') AS generoNombres
//     FROM grupos g
//     JOIN provincias p ON g.provincia = p.id
//     JOIN generos_grupos gg ON gg.grupoId = g.id
//     JOIN generos_musicales gm ON gg.generoId = gm.id
//     LEFT JOIN grupo_fotos gf ON g.id = gf.grupoId
//     LEFT JOIN votos_grupos v ON g.id = v.grupoVotado
//     WHERE 1=1
//     `;

//     const queryParams = [];

//     if (filters.nombre) {
//         query += ' AND g.nombre LIKE ?';
//         queryParams.push(`%${filters.nombre}%`);
//     }

//     if (filters.provincia) {
//         query += ' AND p.provincia LIKE ?';
//         queryParams.push(`%${filters.provincia}%`);
//     }

//     if (filters.generos) {
//         query += ' AND gg.generoId = ?'; // Filtramos por ID de género
//         queryParams.push(filters.generos);
//     }

//     query += ' GROUP BY g.id, g.nombre, g.usuario_id, p.provincia';

//     // Ordenamiento dinámico basado en el campo y dirección proporcionados
//     if (filters.order && filters.field) {
//         const orderField =
//             filters.field === 'media_votos' ? 'media_votos' : 'g.nombre'; // Ejemplo de campos de ordenación
//         const orderDirection =
//             filters.order && filters.order.toUpperCase() === 'ASC'
//                 ? 'ASC'
//                 : 'DESC';
//         query += ` ORDER BY ${orderField} ${orderDirection}`;
//     } else {
//         // Ordenamiento fijo por defecto
//         query += ' ORDER BY media_votos DESC';
//     }

//     // Paginación
//     const page = filters.page ? parseInt(filters.page, 10) : 1;
//     let pageSize = filters.pageSize;

//     if (pageSize !== '*') {
//         pageSize = pageSize ? parseInt(pageSize, 10) : 10;
//         const offset = (page - 1) * pageSize;
//         query += ` LIMIT ? OFFSET ?`;
//         queryParams.push(pageSize, offset);
//     }

//     // Consulta para obtener el total de grupos
//     let countQuery = `
//     SELECT COUNT(DISTINCT g.id) AS total
//     FROM grupos g
//     JOIN provincias p ON g.provincia = p.id
//     JOIN generos_grupos gg ON gg.grupoId = g.id
//     JOIN generos_musicales gm ON gg.generoId = gm.id
//     LEFT JOIN votos_grupos v ON g.id = v.grupoVotado
//     WHERE 1=1
//     `;

//     // Agregar filtros al conteo
//     if (filters.nombre) {
//         countQuery += ' AND g.nombre LIKE ?';
//     }

//     if (filters.provincia) {
//         countQuery += ' AND p.provincia LIKE ?';
//     }

//     if (filters.generos) {
//         countQuery += ' AND gg.generoId = ?';
//     }

//     const [countResult] = await pool.query(
//         countQuery,
//         queryParams.slice(
//             0,
//             filters.nombre ? 1 : filters.provincia ? 2 : filters.generos ? 3 : 0
//         )
//     );
//     const total = countResult[0].total;

//     const [rows] = await pool.query(query, queryParams);

//     // Consulta para obtener las fotos agrupadas por grupo
//     const [photos] = await pool.query(`
//         SELECT id, name, grupoId
//         FROM grupo_fotos
//     `);

//     // Agrupamos las fotos por grupo excluyendo los archivos PDF
//     const groupedPhotos = photos.reduce((acc, photo) => {
//         if (path.extname(photo.name).toLowerCase() !== '.pdf') {
//             if (!acc[photo.grupoId]) {
//                 acc[photo.grupoId] = [];
//             }
//             acc[photo.grupoId].push({
//                 id: photo.id,
//                 name: photo.name,
//             });
//         }
//         return acc;
//     }, {});

//     // Añadimos las fotos correspondientes a cada grupo en el resultado
//     const result = rows.map((row) => ({
//         ...row,
//         fotos: groupedPhotos[row.id] || [],
//     }));
//     return { rows: result, total };
// }

import getPool from '../../database/getPool.js';
import path from 'path';

export async function listGruposService(filters) {
    console.log('Filtros recibidos:', filters);
    const pool = await getPool();

    // Consulta principal para obtener los grupos con filtros
    let query = `
    SELECT 
        g.id, 
        g.nombre, 
        g.usuario_id,
        g.createdAt,
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
        const orderField =
            filters.field === 'media_votos' ? 'media_votos' : 'g.nombre';
        const orderDirection =
            filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        query += ` ORDER BY ${orderField} ${orderDirection}`;
    } else {
        query += ' ORDER BY media_votos DESC'; // Ordenamiento por defecto
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

    // *** Aquí imprimimos la consulta generada y los parámetros para depuración ***
    console.log('Consulta generada:', query);
    console.log('Parámetros:', queryParams);

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
        SELECT id, name, grupoId 
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
