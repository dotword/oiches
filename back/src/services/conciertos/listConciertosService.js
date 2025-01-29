import getPool from '../../database/getPool.js';

const listConciertosService = async (filters) => {
    try {
        const pool = await getPool();

        let query = `
            SELECT 
                conciertos.*, 
                grupos.nombre AS artista, 
                salas.nombre AS sala, 
                salas.ciudad AS ciudad, 
                provincias.provincia AS provincia,
                (SELECT GROUP_CONCAT(generoId) FROM generos_grupos WHERE generos_grupos.grupoId = grupos.id) AS generos,
                GROUP_CONCAT(DISTINCT generos_musicales.nombre SEPARATOR ', ') AS generoNombres
            FROM 
                conciertos
            LEFT JOIN 
                reservas ON reservas.id = conciertos.reservaId
            LEFT JOIN 
                grupos ON reservas.grupo_id = grupos.id
            LEFT JOIN 
                salas ON reservas.sala_id = salas.id
            LEFT JOIN 
                provincias ON provincias.id = salas.provincia  
            JOIN
                generos_grupos generos_grupos ON generos_grupos.grupoId = grupos.id
            JOIN
                generos_musicales generos_musicales ON generos_grupos.generoId = generos_musicales.id     
            WHERE 
                conciertos.fecha >= NOW()
        `;

        const queryParams = [];

        if (!filters.clearFilters) {
            if (filters.provincia && filters.provincia.trim() !== '') {
                query += ' AND provincias.provincia LIKE ?';
                queryParams.push(`%${filters.provincia}%`);
            }

            if (filters.ciudad && filters.ciudad.trim() !== '') {
                query += ' AND salas.ciudad LIKE ?';
                queryParams.push(`%${filters.ciudad}%`);
            }

            // Filtrar por rango de fechas
            if (filters.fecha && filters.fecha.trim() !== '') {
                query += ' AND conciertos.fecha >= ?';
                queryParams.push(filters.fecha);
            }
            if (filters.fechaHasta && filters.fechaHasta.trim() !== '') {
                query += ' AND conciertos.fecha <= ?';
                queryParams.push(filters.fechaHasta);
            }

            if (filters.generos && filters.generos !== '') {
                const generosArray = filters.generos.split(','); // Si generos es una lista separada por comas
                query += ` AND generos_grupos.generoId IN (${generosArray.map(() => '?').join(',')})`;
                queryParams.push(...generosArray);
            }
        }

        query += `
            GROUP BY 
                conciertos.id, grupos.id, salas.id, provincias.id
        `;
        const orderDirection =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'DESC'
                : 'ASC';
        query += ` ORDER BY conciertos.fecha ${orderDirection}`;

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

        // Consulta para obtener el total de conciertos sin paginación
        let countQuery = `
            SELECT COUNT(DISTINCT conciertos.id) AS total
            FROM conciertos
            LEFT JOIN reservas ON reservas.id = conciertos.reservaId
            LEFT JOIN grupos ON reservas.grupo_id = grupos.id
            LEFT JOIN salas ON reservas.sala_id = salas.id
            LEFT JOIN provincias ON provincias.id = salas.provincia
            WHERE 1=1
        `;

        if (!filters.clearFilters) {
            if (filters.provincia && filters.provincia.trim() !== '') {
                countQuery += ' AND provincias.provincia LIKE ?';
            }
            if (filters.ciudad && filters.ciudad.trim() !== '') {
                countQuery += ' AND salas.ciudad LIKE ?';
            }
            if (filters.fecha && filters.fecha.trim() !== '') {
                countQuery += ' AND conciertos.fecha >= ?';
            }
            if (filters.fechaHasta && filters.fechaHasta.trim() !== '') {
                countQuery += ' AND conciertos.fecha <= ?';
            }
            if (filters.generos && filters.generos !== '') {
                countQuery += ` AND generos_grupos.generoId IN (${filters.generos
                    .split(',')
                    .map(() => '?')
                    .join(',')})`;
            }
        }

        const [countResult] = await pool.query(countQuery, queryParams);
        const total = countResult[0].total;

        return { rows, total };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listConciertosService;
