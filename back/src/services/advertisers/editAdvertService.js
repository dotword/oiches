import sendMailUtil from '../../utils/sendMailUtil.js';
import getPool from '../../database/getPool.js';
import { SMTP_USER, URL_FRONT } from '../../../env.js';

const editAdvertService = async (idAdvert, updatedFields) => {
    const pool = await getPool();

    // Comprobar el title del advert
    const [titleAdv] = await pool.query(
        'SELECT title FROM ad_classifieds WHERE id = ?',
        [idAdvert]
    );

    // Creamos el asunto del email
    const emailSubject = `Clasificado editado/renovado en Oiches. ${titleAdv[0].title}`;
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
        
                    <p>¡Te informamos de que el clasificado ${titleAdv[0].title} ha sido renovado/editado !</p>

                    <p>Entra en tu cuenta en el siguiente enlace: <b><a href="${URL_FRONT}/login">Mi cuenta</a></b>, para verificarlo.</p>
                    
                </body>
                </html>
                 `;

    try {
        await sendMailUtil(SMTP_USER, emailSubject, emailBody);
    } catch (error) {
        return;
    }

    // Crear las partes de la consulta dinámicamente según los campos proporcionados
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updatedFields)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if (fields.length !== 0) {
        values.push(idAdvert);

        const query = `
                UPDATE ad_classifieds
                 SET ${fields.join(', ')}
                WHERE id = ?
            `;

        await pool.query(query, values);
    }
};

export default editAdvertService;
