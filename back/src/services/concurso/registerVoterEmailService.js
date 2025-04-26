import { v4 as uuid } from 'uuid';
import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const registerVoterEmailService = async (
    email,
    verification_token,
    expiration
) => {
    const pool = await getPool();
    // Generamos el id del usuario.
    const id = uuid();

    // Comprobar que el email no esté registrado
    let [voters] = await pool.query(`SELECT id FROM voters WHERE email = ?`, [
        email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (voters.length > 0)
        throw generateErrorsUtil('Este email ya está registrado', 409);

    // Creamos el asunto del email de verificación.
    const emailSubject =
        'Verifica tu email para votar en el concurso de Oiches';

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
                        button {
                            padding: 5px 10px;
                            background-color: #9333ea;
                            border-radius: 20px;
                            border: none;
                        }
                        button a {
                            color: #fff;
                            text-decoration: none
                        }
                        p {
                            margin: 8px 0; 
                        }
                    </style>
                </head>
             <p>¡Bienvenid@!</p>

             <p>Para verificar tu email y votar en el concurso de Oiches, haz clic en el siguiente botón.</p>
             <p><button><a href="${URL_FRONT}/concurso/validate_email/${verification_token}" style="color:white; text-decoration:none; padding: 5px 10px; background-color: #9333ea; border-radius: 20px; border: none;">Validar mi email</a></button></p>
             <br />
             <p>Si el botón no funciona, haz clic en el siguiente enlace: <b><a href="${URL_FRONT}/votacion-concurso-Oiches">Concurso Oiches 2025</a></b>, e introduce este código de verificación: <b>${verification_token}</b></p>
             <p>Si no te has registrado en el concurso, ignora este mensaje.</p>
             <br />

                    <p>--</p>
                    <p style="font-size:12px">
                        <strong>Equipo Oiches</strong><br>
                        <strong><a href="mailto:hola@oiches.com" style="color:#000; text-decoration:none;">hola@oiches.com</a></strong><br>
                        <strong><a href="https://www.oiches.com" style="color:#000; text-decoration:none;" target="_blank">www.oiches.com</a></strong><br>
                        <strong><a href="https://instagram.com/oiches_musica" style="color:#000; text-decoration:none;" target="_blank">instagram.com/oiches_musica</a></strong>
                    </p>
                    <br>
                    <p class="small-text"><strong>AVISO SOBRE CONFIDENCIALIDAD:</strong> Esta comunicación contiene información que es confidencial y también puede contener información privilegiada. Es para uso exclusivo del destinatario/s. Si usted no es el destinatario/s tenga en cuenta que cualquier distribución, copia o uso de esta comunicación o la información que contiene está estrictamente prohibida. Si usted ha recibido esta comunicación por error por favor notifíquelo a <a href="mailto:hola@oiches.com">hola@oiches.com</a>.</p>
                     <p class="small-text"><strong>PROTECCIÓN DE DATOS:</strong> Conforme a lo establecido en el Artículo 13 del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD), le informamos que los datos personales recabados del propio interesado, serán tratados bajo la responsabilidad del Responsable del Tratamiento, Carmen Salgueiro Rodríguez, para el envío de comunicaciones sobre nuestros productos y servicios y se conservarán mientras ninguna de las partes se oponga a ello o durante el período necesario para cumplir con las obligaciones legales. Se garantiza un tratamiento de datos leal y transparente. Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal. Le informamos que los derechos de acceso, rectificación, supresión, limitación de tratamiento, u oposición al tratamiento, así como el derecho a la portabilidad de los datos podrán ser ejercitados ante el responsable del tratamiento por cualquier medio sujeto en derecho, acompañando de copia de documento oficial que le identifique dirigiéndose o enviando un mensaje al correo electrónico a <a href="mailto:hola@oiches.com">hola@oiches.com</a>, según los términos que la normativa aplicable establece. Puede consultar la información adicional y detallada sobre Protección de Datos en nuestra página web <a href="https://www.oiches.com" target="_blank">oiches.com</a>. Si considera que el tratamiento no se ajusta a la normativa vigente, podrá presentar una reclamación ante la autoridad de control en <a href="https://www.agpd.es" target="_blank">www.agpd.es</a>.
                    </p>
                </body>
                </html>
         `;

    // Enviamos el email de verificación al usuario.
    try {
        await sendMailUtil(email, emailSubject, emailBody);
    } catch (error) {
        throw generateErrorsUtil(
            'Error al enviar el email. Intenta más tarde.',
            500
        );
    }

    await pool.query(
        `
            INSERT INTO voters (id, email, verification_token, token_expires ) 
            VALUES (?, ?, ?, ?)
        `,
        [id, email, verification_token, expiration]
    );
};

export default registerVoterEmailService;
