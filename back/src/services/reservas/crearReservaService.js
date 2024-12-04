import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const crearReservaService = async (
    project,
    fecha,
    flexible,
    message,
    // id,
    sala_id
) => {
    const pool = await getPool();

    // Generamos el id de la entrada.
    const reservaId = uuid();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservaFecha = new Date(fecha);
    reservaFecha.setHours(0, 0, 0, 0);

    if (reservaFecha < today) {
        throw generateErrorsUtil(
            'No se puede reservar una fecha anterior a hoy.',
            404
        );
    }
    const [grupoResults] = await pool.query(
        'SELECT nombre FROM grupos WHERE id = ?',
        [project]
    );
    if (grupoResults[0] === undefined) {
        throw generateErrorsUtil(
            'Tienes que publicar tu proyecto musical para poder reservar',
            404
        );
    }

    const grupoNombre = grupoResults[0].nombre;

    const [salaResults] = await pool.query(
        'SELECT id, nombre, usuario_id FROM salas WHERE id = ?',
        [sala_id]
    );
    const salaUserId = salaResults[0].usuario_id;
    const salaNombre = salaResults[0].nombre;

    const [emailSala] = await pool.query(
        'SELECT email, username FROM usuarios WHERE id = ?',
        [salaUserId]
    );
    const salaEmail = emailSala[0].email;
    const salaUsername = emailSala[0].username;

    // Creamos el asunto del email de verificación.
    const emailSubject = `Has recibido una reserva para tu sala ${salaNombre}, en Oiches.`;

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
                        p {
                            margin: 8px 0; /* Espaciado entre párrafos */
                        }
                    </style>
                </head>
                <body>
                    <p>Hola, ${salaUsername}!</p>
        
                    <p><b>${grupoNombre}</b> quiere tocar en ${salaNombre} el día ${fecha}.${flexible === 'on' ? ' Es flexible en las fechas.' : ''}</p> 
                    <p><b>Mensaje de ${grupoNombre}:</b><br>
                    "${message}"</p>

                    <p>Puedes ver la información de ${grupoNombre} en el siguiente enlace: <a href="${URL_FRONT}/grupo/${project}">Ver ${grupoNombre}</p>

                   <p>Entra en <a href="${URL_FRONT}/login">tu cuenta</a> para confirmar o rechazar el bolo, o para contactar con ${grupoNombre}.</p>
                   
                   <p>Saludos,</p><br>
                    

                    <p>--</p>
                    <p style="font-size:12px">
                        <strong>Equipo Oiches</strong><br>
                        <strong><a href="mailto:hola@oiches.com" style="text-decoration: none">hola@oiches.com</a></strong><br>
                        <strong><a href="https://www.oiches.com" style="text-decoration: none" target="_blank">www.oiches.com</a></strong><br>
                        <strong><a href="https://instagram.com/oiches_musica" style="text-decoration: none" target="_blank">instagram.com/oiches_musica</a></strong>
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
        await sendMailUtil(salaEmail, emailSubject, emailBody);
    } catch (error) {
        return;
    }

    await pool.query(
        'INSERT INTO reservas(id, fecha, sala_id, grupo_id) VALUES (?, ?, ?, ?)',
        [reservaId, fecha, sala_id, project]
    );

    return {
        reserva: {
            fecha,
            sala_id,
            project,
            salaResults,
            grupoResults,
        },
    };
};
