import { v4 as uuid } from 'uuid';
import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const registerVoterEmailService = async (
    email,
    user_rrss,
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

    // Comprobar que RRSS no esté registrado
    let [votersRRSS] = await pool.query(
        `SELECT id FROM voters WHERE user_rrss = ?`,
        [user_rrss]
    );

    // Si existe algún usuario con ese RRSS lanzamos un error.
    if (votersRRSS.length > 0)
        throw generateErrorsUtil('Este usuario ya está registrado', 409);

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

<p>Para validar tu voto en el Concurso Oiches 2025, sigue estos pasos:</p>

<ol style="padding-left: 1em;">
  <li>
    Confirma tu cuenta de red social usando el nombre de usuario que incluiste en el formulario:
    <ul style="padding-left: 1.2em; margin-top: 0.5em;">
      <li>
        <strong>Instagram</strong>: síguenos en <a href="https://instagram.com/oiches_musica" target="_blank">@oiches_musica</a> 
        o envíanos un mensaje desde tu cuenta <em>(@tu_usuario)</em> con el texto <em>“Concurso Oiches”</em>.
      </li>
      <li>
        <strong>Facebook</strong>: síguenos en <a href="https://facebook.com/oiches" target="_blank">@oiches</a> 
        o envíanos un mensaje desde tu cuenta <em>(@tu_usuario)</em> con el texto <em>“Concurso Oiches”</em>.
      </li>
    </ul>
  </li>
  <br>
  <li>
    Verifica tu correo electrónico:
    <br>
    <a href="${URL_FRONT}/concurso/validate_email/${verification_token}"
       style="display: inline-block; padding: 8px 16px; background-color: #9333ea; color: #ffffff; text-decoration: none; border-radius: 20px;">
       Confirmar mi email
    </a>
    <br><br>
<p>Si el botón no funciona, haz clic en el siguiente enlace: <b><a href="${URL_FRONT}/votacion-concurso-Oiches">Concurso Oiches 2025</a></b>, e introduce este código de verificación: <b>${verification_token}</b></p>
  </li>
<br>
  <li>
    ¡Ya puedes votar a tus <strong>6 artistas/grupos favoritos</strong> en la web!
  </li>
</ol>

<p>Si no te has registrado en el concurso, ignora este mensaje.</p>

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
            INSERT INTO voters (id, email, verification_token, token_expires, user_rrss ) 
            VALUES (?, ?, ?, ?, ?)
        `,
        [id, email, verification_token, expiration, user_rrss]
    );
};

export default registerVoterEmailService;
