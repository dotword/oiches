import getPool from '../../database/getPool.js';

const listAdvertsService = async (filters) => {
    try {
        const pool = await getPool();

        // Whitelist para evitar inyección SQL en ORDER BY
        const orderFieldMap = {
            fecha: 'A.createdAt',
            title: 'A.title',
        };
        const orderColumn =
            orderFieldMap[filters.orderField] || orderFieldMap.fecha;
        const orderDir =
            filters.order && filters.order.toUpperCase() === 'ASC'
                ? 'ASC'
                : 'DESC';

        // Base FROM + JOINs (reutilizable para count)
        let baseFromAndJoins = `
      FROM ad_classifieds A
      LEFT JOIN ad_categories C ON C.id = A.category_id
      LEFT JOIN ad_packages PK ON PK.id = A.package_id
      LEFT JOIN usuarios US ON US.id = A.user_id
      LEFT JOIN provincias PR ON PR.id = A.provincia_id
      LEFT JOIN advertiser_profiles AP ON AP.user_id = A.user_id
    `;

        // Construir WHERE dinámico
        const whereClauses = ['1=1'];
        const queryParams = [];

        if (filters.title && filters.title !== '') {
            whereClauses.push('AND A.title LIKE ?');
            queryParams.push(`%${filters.title}%`);
        }
        if (filters.package && filters.package !== '') {
            whereClauses.push('AND PK.package LIKE ?');
            queryParams.push(`%${filters.package}%`);
        }
        if (filters.companyName && filters.companyName !== '') {
            whereClauses.push('AND AP.company_name LIKE ?');
            queryParams.push(`%${filters.companyName}%`);
        }
        if (filters.status && filters.status !== '') {
            whereClauses.push('AND A.status = ?');
            queryParams.push(filters.status);
        }
        if (filters.userActive && filters.userActive !== '') {
            whereClauses.push('AND US.active = ?');
            queryParams.push(filters.userActive);
        }
        if (filters.expired && filters.expired !== '') {
            // ejemplo: expired=true -> A.expiresAt < NOW()
            if (filters.expired === 'true') {
                whereClauses.push('AND A.expiresAt < NOW()');
            } else if (filters.expired === 'false') {
                whereClauses.push(
                    'AND (A.expiresAt IS NULL OR A.expiresAt >= NOW())'
                );
            }
        }

        const whereSQL = whereClauses.join(' ');

        // Consulta principal
        let query = `
      SELECT
        A.id,
        A.user_id,
        US.active AS userActive,
        AP.company_name AS companyName,
        A.category_id,
        C.name AS category,
        A.package_id,
        PK.package AS package,
        A.address,
        A.city,
        PR.provincia AS provincia,
        PR.id AS provinciaId,
        A.title,
        A.description,
        A.link,
        A.contact_email,
        A.contact_phone,
        A.image_url,
        A.status,
        A.publishedAt,
        A.expiresAt,
        A.createdAt,
        COALESCE((
          SELECT SUM(s2.clicks)
          FROM ad_classified_stats s2
          WHERE s2.classified_id = A.id
        ), 0) AS clicks
      ${baseFromAndJoins}
      WHERE ${whereSQL}
      ORDER BY ${orderColumn} ${orderDir}
    `;

        // Paginación
        const page = filters.page ? parseInt(filters.page, 10) : 1;
        const pageSize = filters.pageSize ? parseInt(filters.pageSize, 10) : 25;
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

export default listAdvertsService;
