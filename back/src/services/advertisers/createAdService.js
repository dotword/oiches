import { v4 as uuid } from 'uuid';
import sendMailUtil from '../../utils/sendMailUtil.js';
import getPool from '../../database/getPool.js';
import { SMTP_USER, URL_FRONT } from '../../../env.js';

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

    // Creamos el asunto del email
    const emailSubject = `Nuevo clasificado en Oiches. ${title}`;

    // Creamos el contenido del email
    const emailBody = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-size: 12px; 
                            font-family: Arial, sans-serif;
                            line-height: 1.4;
                        }
                        .small-text {
                            font-size: 8px;
                        }
                        a {
                            color: #000000;
                        }
                        a:hover {
                            text-decoration: underline; 
                        }
                        p {
                            margin: 8px 0;
                        }
                    </style>
                </head>
                <body>
                    <p>Hola,</p>
        
                    <p>¡Te informamos de que hay un nuevo clasificado para revisar en Oiches: ${title}!</p>

                    <p>Entra en tu cuenta en el siguiente enlace: <b><a href="${URL_FRONT}/login">Mi cuenta</a></b>, para verificarlo.</p>
                    
                </body>
                </html>
                 `;

    // Enviamos el email de verificación al usuario.
    try {
        await sendMailUtil(SMTP_USER, emailSubject, emailBody);
    } catch (error) {
        return;
    }

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
