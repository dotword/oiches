import getPool from '../../database/getPool.js';
import path from 'path';

export async function listSalasService(filters) {
    const pool = await getPool();

    // Consulta principal para obtener las salas con filtros y paginación
    let query = `
    SELECT 
        salas.id, 
        salas.usuario_id, 
        salas.nombre, 
        salas.ciudad,
        salas.published,
        salas.createdAt,
        salas.updatedAt,
        (SELECT avatar FROM usuarios WHERE usuarios.id = salas.usuario_id) AS avatar,
        (SELECT provincia FROM provincias WHERE provincias.id = salas.provincia) AS provincia,
        (SELECT AVG(voto) FROM votos_salas WHERE votos_salas.salaVotada = salas.id) AS media_votos,
        (SELECT GROUP_CONCAT(generoId) FROM generos_salas WHERE generos_salas.salaId = salas.id) AS generos,
        GROUP_CONCAT(DISTINCT gm.nombre SEPARATOR ', ') AS generoNombres
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

    // Filtro por nombre (si está presente)
    if (filters.nombre && filters.nombre.trim() !== '') {
        query += ' AND salas.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    // Filtro por género (si está presente)
    if (filters.genero) {
        query += ' AND gs.generoId = ?';
        queryParams.push(filters.genero);
    }

    // Filtro por provincia (si está presente)
    if (filters.provincia) {
        query += ' AND salas.provincia = ?';
        queryParams.push(filters.provincia);
    }

    query +=
        ' GROUP BY salas.id, salas.nombre, salas.usuario_id, salas.provincia';

    // Ordenamiento por media de votos o nombre, dependiendo del filtro
    if (filters.order && filters.field) {
        const orderField =
            filters.field === 'media_votos' ? 'media_votos' : 'salas.updatedAt';

        const orderDirection =
            filters.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        query += ` ORDER BY ${orderField} ${orderDirection}`;
    } else {
        // Orden por defecto (por media de votos descendente)
        query += ' ORDER BY media_votos DESC, updatedAt DESC';
    }

    // Paginación
    const page = filters.page ? parseInt(filters.page, 10) : 1;
    let pageSize = filters.pageSize ? parseInt(filters.pageSize, 10) : 10;
    const offset = (page - 1) * pageSize;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(pageSize, offset);

    // Ejecutar consulta principal
    const [rows] = await pool.query(query, queryParams);

    // Consulta para obtener el conteo total de salas sin paginación
    let countQuery = `
    SELECT COUNT(DISTINCT salas.id) AS total
    FROM 
        salas 
    LEFT JOIN provincias ON provincias.id = salas.provincia
    LEFT JOIN generos_salas gs ON gs.salaId = salas.id
    LEFT JOIN generos_musicales gm ON gs.generoId = gm.id        
    WHERE 
        1=1
    `;

    // Aplicar los mismos filtros a la consulta de conteo
    const countQueryParams = [];
    if (filters.nombre && filters.nombre.trim() !== '') {
        countQuery += ' AND salas.nombre LIKE ?';
        countQueryParams.push(`%${filters.nombre}%`);
    }

    if (filters.genero) {
        countQuery += ' AND gs.generoId = ?';
        countQueryParams.push(filters.genero);
    }

    if (filters.provincia) {
        countQuery += ' AND salas.provincia = ?';
        countQueryParams.push(filters.provincia);
    }

    const [[countResult]] = await pool.query(countQuery, countQueryParams);

    // Consulta para obtener las fotos agrupadas por sala
    const [photos] = await pool.query(`
            SELECT id, name, salaId, es_principal
            FROM sala_fotos
        `);

    // Agrupar las fotos por sala excluyendo los archivos PDF
    const groupedPhotos = photos.reduce((acc, photo) => {
        if (path.extname(photo.name).toLowerCase() !== '.pdf') {
            if (!acc[photo.salaId]) {
                acc[photo.salaId] = [];
            }
            acc[photo.salaId].push({
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

    return {
        result,
        total: countResult.total,
    };
}
