import getPool from '../../database/getPool.js';
import path from 'path';

export async function listGruposService(filters) {
    const pool = await getPool();
    console.log(filters);
    let query = `
    SELECT 
        g.id, 
        g.nombre, 
        g.usuario_id,
        p.provincia AS provincia_nombre,
        COALESCE(SUM(v.voto), 0) AS votos,
        (SELECT AVG(voto) FROM votos_grupos WHERE votos_grupos.grupoVotado = g.id) AS media_votos,
        (SELECT GROUP_CONCAT(generoId) FROM generos_grupos WHERE generos_grupos.grupoId = g.id) AS generos
    FROM grupos g
    JOIN provincias p ON g.provincia = p.id
    JOIN generos_grupos ON generos_grupos.grupoId = g.id
    LEFT JOIN grupo_fotos gf ON g.id = gf.grupoId
    LEFT JOIN votos_grupos v ON g.id = v.grupoVotado
    WHERE 1=1
    `;

    const queryParams = [];

    if (filters.nombre) {
        query += ' AND g.nombre LIKE ?';
        queryParams.push(`%${filters.nombre}%`);
    }

    if (filters.provincia) {
        query += ' AND p.provincia LIKE ?';
        queryParams.push(`%${filters.provincia}%`);
    }

    if (filters.generos) {
        query += ' AND generos_grupos.generoId = ?'; // Filtramos por ID de género
        queryParams.push(filters.generos);
    }

    query += ' GROUP BY g.id, g.nombre, g.usuario_id, p.provincia';

    // Ordenamiento dinámico basado en el campo y dirección proporcionados
    if (filters.order && filters.field) {
        const orderField =
            filters.field === 'media_votos' ? 'media_votos' : 'g.nombre'; // Example of sorting fields
        const orderDirection =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';
        query += ` ORDER BY ${orderField} ${orderDirection}`;
    } else {
        // Ordenamiento fijo por defecto
        query += ' ORDER BY media_votos DESC';
    }

    const [rows] = await pool.query(query, queryParams);

    // Consulta para obtener las fotos agrupadas por grupo
    const [photos] = await pool.query(`
        SELECT id, name, grupoId 
        FROM grupo_fotos
    `);

    // Agrupamos las fotos por grupo excluyendo los archivos PDF
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

    // Añadimos las fotos correspondientes a cada grupo en el resultado
    const result = rows.map((row) => ({
        ...row,
        fotos: groupedPhotos[row.id] || [],
    }));

    return result;
}
