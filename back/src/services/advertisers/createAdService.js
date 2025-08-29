import { v4 as uuid } from 'uuid';
import getPool from '../../database/getPool.js';

const createAdService = async (
    userId,
    category_id,
    package_id,
    address,
    city,
    provincia_id,
    title,
    description,
    link,
    contact_email,
    contact_phone,
    poster
) => {
    const pool = await getPool();

    // Generamos el id de la entrada.
    const advId = uuid();

    await pool.query(
        `
            INSERT INTO ad_classifieds (id, user_id, category_id, package_id, address, city, provincia_id, title, description, link, contact_email, contact_phone, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            advId,
            userId,
            category_id,
            package_id,
            address,
            city,
            provincia_id,
            title,
            description,
            link,
            contact_email,
            contact_phone,
            poster,
        ]
    );

    return advId;
};

export default createAdService;
