import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertUserService = async (
    username,
    email,
    password,
    roles,
    registrationCode
) => {
    const pool = await getPool();
    // Generamos el id del usuario.
    const userId = uuid();

    // Buscamos en la base de datos algún usuario con ese nombre.
    let [users] = await pool.query(
        `SELECT id FROM usuarios WHERE username = ?`,
        [username]
    );

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0)
        throw generateErrorsUtil(
            'El nombre de usuario ya está registrado',
            409
        );

    // Comprobar que el email no esté registrado
    [users] = await pool.query(` SELECT id FROM usuarios WHERE email=?`, [
        email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0)
        throw generateErrorsUtil('El email ya está registrado', 409);

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Oiches:)';

    // Creamos el contenido del email
    const emailBody = `
               <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-size: 12px; /* Tamaño general reducido */
                            font-family: Arial, sans-serif;
                            line-height: 1.4; /* Altura de línea para mayor legibilidad */
                        }
                        .small-text {
                            font-size: 8px; /* Tamaño de texto aún más pequeño */
                        }
                        a {
                            color: #000000;
                        }
                        a:hover {
                            text-decoration: underline; /* Subrayado al pasar el mouse */
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
                            margin: 8px 0; /* Espaciado entre párrafos */
                        }
                    </style>
                </head>
             <p>¡Bienvenid@ ${username}!</p>

             <p>Gracias por registrarte en Oiches.</p>
             <p>Para activar tu cuenta, haz clic en el siguiente botón.</p>
             <p><button><a href="${URL_FRONT}/users/validate/${registrationCode}" style="color:white; text-decoration:none;">Activar mi cuenta</a></button></p>
             <p>Si el botón no funciona, haz clic en el siguiente enlace: <b><a href="${URL_FRONT}/validateUser">activar mi cuenta</a></b>, e introduce este código: <b>${registrationCode}</b></p>

                    <p>--</p>
                    <p style="font-size:12px">
                        <strong>Equipo Oiches</strong><br>
                        <strong><a href="mailto:hola@oiches.com" tyle="color:white; text-decoration:none;">hola@oiches.com</a></strong><br>
                        <strong><a href="https://www.oiches.com" tyle="color:white; text-decoration:none;" target="_blank">www.oiches.com</a></strong><br>
                        <strong><a href="https://instagram.com/oiches_musica" tyle="color:white; text-decoration:none;" target="_blank">instagram.com/oiches_musica</a></strong>
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
        return;
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Si el email NO se encuentra insertar en la DB
    await pool.query(
        `
            INSERT INTO usuarios (id, username, email, password, roles, registrationCode ) 
            VALUES (?, ?,?,?,?,?)
        `,
        [userId, username, email, hashedPass, roles, registrationCode]
    );
};

export default insertUserService;
