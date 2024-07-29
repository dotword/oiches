import getPool from '../../database/getPool.js';

export async function listGruposService(filters, sort) {
    const pool = await getPool();

    let query = `
    SELECT 
        g.id, 
        g.nombre, 
        g.usuario_id,
        p.provincia AS provincia_nombre,
        gm.nombre AS genero_nombre,
        JSON_ARRAYAGG(
            CASE 
                WHEN gf.name NOT LIKE '%.pdf' THEN JSON_OBJECT('name', gf.name, 'createdAt', gf.createdAt) 
                ELSE NULL 
            END
        ) AS fotos,
        GROUP_CONCAT(
            CASE 
                WHEN gf.name LIKE '%.pdf' THEN gf.name 
            END 
            ORDER BY gf.createdAt
        ) AS pdfs,
        COALESCE(SUM(v.voto), 0) AS votos,
        (SELECT AVG(voto) FROM votos_grupos WHERE votos_grupos.grupoVotado = g.id) AS media_votos
    FROM grupos g
    JOIN provincias p ON g.provincia = p.id
    JOIN generos_musicales gm ON g.generos = gm.id
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
        query += ' AND gm.nombre LIKE ?';
        queryParams.push(`%${filters.generos}%`);
    }

    query += ' GROUP BY g.id, g.nombre, g.usuario_id, p.provincia, gm.nombre';

    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
}
