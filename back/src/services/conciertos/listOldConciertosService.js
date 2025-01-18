import getPool from '../../database/getPool.js';

const listOldConciertosService = async (page = 1, pageSize = 12) => {
    try {
        const pool = await getPool();

        let query = `
            SELECT 
                conciertos.*, 
                grupos.nombre AS artista, 
                salas.nombre AS sala, 
                salas.ciudad AS ciudad, 
                provincias.provincia AS provincia
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
            WHERE 
                conciertos.fecha < CURDATE()
        `;

        // Paginación
        const offset = (page - 1) * pageSize;
        query += ` LIMIT ? OFFSET ?`;
        const queryParams = [pageSize, offset];

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
            WHERE conciertos.fecha < CURDATE() -- Condición consistente con la consulta principal
        `;
        const [countResult] = await pool.query(countQuery);
        const total = countResult[0].total;

        return { rows, total, page, pageSize };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listOldConciertosService;
