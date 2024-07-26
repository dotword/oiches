// src/services/grupos/listGruposService.js

import getPool from '../../database/getPool.js';

export async function listGruposService(filters, sort) {
    const pool = await getPool();

    let query = `
        SELECT 
            g.id, g.nombre, g.usuario_id,
            p.provincia AS provincia_nombre,
            gm.nombre AS genero_nombre,
            gf.name AS primera_foto
        FROM grupos g
        JOIN provincias p ON g.provincia = p.id
        JOIN generos_musicales gm ON g.generos = gm.id
        LEFT JOIN (
            SELECT grupoId, name, MIN(createdAt) AS first_photo_date
            FROM grupo_fotos 
            GROUP BY grupoId, name
        ) gf ON g.id = gf.grupoId
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

    query +=
        ' GROUP BY g.id, g.nombre, g.usuario_id, p.provincia, gm.nombre, gf.name';

    if (sort && sort.field && sort.order) {
        query += ` ORDER BY ${sort.field} ${sort.order}`;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
}
