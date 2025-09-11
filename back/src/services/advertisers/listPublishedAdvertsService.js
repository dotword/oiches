import getPool from '../../database/getPool.js';

const listPublishedAdvertsService = async (filters) => {
    try {
        const pool = await getPool();

        // Whitelist para evitar inyección SQL en ORDER BY
        const orderFieldMap = {
            fecha: 'A.createdAt',
            title: 'A.title',
            city: 'A.city',
            provincia: 'PR.provincia',
            category: 'C.name',
            // añade más si necesitas ordenar por otros campos
        };
        const orderColumn =
            orderFieldMap[filters.orderField] || orderFieldMap.fecha;
        // determinar dirección (por defecto DESC salvo que explícitamente sea 'ASC')
        const orderDir =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';

        // Aquí definimos la prioridad de paquetes (0 = más prioritario)
        // 7 -> 0, 4/5/6 -> 1, 1/2/3 -> 2, resto -> 3
        const packagePrioritySQL = `CASE 
            WHEN A.package_id = 7 THEN 0
            WHEN A.package_id IN (4,5,6) THEN 1
            WHEN A.package_id IN (1,2,3) THEN 2
            ELSE 3
        END`;

        // Si se está ordenando por title, usamos la prioridad de paquetes primero
        // y luego ordenamos por A.title (dirección según orderDir). La prioridad
        // de paquetes siempre en ASC para que 7 esté arriba.
        let orderClause;
        if (filters.orderField === 'title') {
            orderClause = `${packagePrioritySQL} ASC, A.title ${orderDir}`;
        } else {
            // para otros campos usamos la columna mapeada y la dirección solicitada
            orderClause = `${orderColumn} ${orderDir}`;
        }

        // Base FROM + JOINs (reutilizable para count)
        let baseFromAndJoins = `
      FROM ad_classifieds A
      LEFT JOIN ad_categories C ON C.id = A.category_id
      LEFT JOIN provincias PR ON PR.id = A.provincia_id
    `;

        // Construir WHERE dinámico
        const whereClauses = ['1=1 AND A.status = 1 AND A.expiresAt >= NOW()'];
        const queryParams = [];

        if (filters.title && filters.title !== '') {
            whereClauses.push('AND A.title LIKE ?');
            queryParams.push(`%${filters.title}%`);
        }
        if (filters.city && filters.city !== '') {
            whereClauses.push('AND A.city LIKE ?');
            queryParams.push(`%${filters.city}%`);
        }
        if (filters.category && filters.category !== '') {
            whereClauses.push('AND C.id = ?');
            queryParams.push(filters.category);
        }
        if (filters.provincia && filters.provincia !== '') {
            whereClauses.push('AND PR.id = ?');
            queryParams.push(filters.provincia);
        }
        if (filters.status && filters.status !== '') {
            whereClauses.push('AND A.status = ?');
            queryParams.push(filters.status);
        }
        if (filters.expired && filters.expired !== '') {
            if (filters.expired === 'true') {
                whereClauses.push('AND A.expiresAt < NOW()');
            } else if (filters.expired === 'false') {
                whereClauses.push(
                    'AND (A.expiresAt IS NULL OR A.expiresAt >= NOW())'
                );
            }
        }

        const whereSQL = whereClauses.join(' ');

        // Consulta principal con ORDER BY personalizado
        let query = `
      SELECT
        A.id,
        A.category_id,
        C.name AS category,
        A.package_id,
        A.address,
        A.city,
        PR.provincia AS provincia,
        PR.id AS provinciaId,
        A.title,
        A.contact_email,
        A.image_url,
        A.status,
        A.publishedAt,
        A.expiresAt
      ${baseFromAndJoins}
      WHERE ${whereSQL}
      ORDER BY ${orderClause}
    `;

        // Paginación
        const page = filters.page ? parseInt(filters.page, 10) : 1;
        const pageSize = filters.pageSize ? parseInt(filters.pageSize, 10) : 6;
        const offset = (page - 1) * pageSize;

        // clonamos los params para la query con LIMIT
        const paramsForRows = [...queryParams, pageSize, offset];
        query += ' LIMIT ? OFFSET ?';

        const [rows] = await pool.query(query, paramsForRows);

        // Count con mismos joins y where (sin limit)
        const countQuery = `
      SELECT COUNT(DISTINCT A.id) AS total
      ${baseFromAndJoins}
      WHERE ${whereSQL}
    `;
        const [countResult] = await pool.query(countQuery, queryParams);
        const total = countResult[0].total || 0;

        return { rows, total };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default listPublishedAdvertsService;
