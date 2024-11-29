import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const aprobarReservaService = async (reserva_id) => {
    try {
        const pool = await getPool();

        const [salaInfo] = await pool.query(
            'SELECT confirmada, sala_id, fecha, grupo_id FROM reservas WHERE id = ?',
            [reserva_id]
        );

        const reservaConfirm = salaInfo[0].confirmada;
        const dateReserva = salaInfo[0].fecha;
        const grupoId = salaInfo[0].grupo_id;

        // Comprobar que la reseva no esté confirmada
        if (reservaConfirm === 1) {
            throw generateErrorsUtil('Esta reserva ya está confirmada.', 404);
        }

        // Comprobar que la fecha de la reserva es anterior a hoy
        // Convertir la fecha ingresada a un objeto Date
        const dateReservation = new Date(dateReserva);
        // Obtener la fecha de hoy
        const today = new Date();
        // Comprobar fechas
        if (dateReservation < today) {
            throw generateErrorsUtil(
                'No puedes modificar una reserva anterior a la fecha de hoy.',
                404
            );
        }

        // Comprobar el email del grupo
        const [usuarioId] = await pool.query(
            'SELECT usuario_id, nombre FROM grupos WHERE id = ?',
            [grupoId]
        );
        const userGrupoId = usuarioId[0].usuario_id;
        const grupoNombre = usuarioId[0].nombre;

        const [emailGrupo] = await pool.query(
            'SELECT email FROM usuarios WHERE id = ?',
            [userGrupoId]
        );
        const grupoEmail = emailGrupo[0].email;

        // Creamos el asunto del email de verificación.
        const emailSubject = `Tu reserva para el ${dateReserva} en Oiches ha sido confirmada.`;

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
                    <p>Hola, ${grupoNombre}!</p>
        
                    <p>Tu reserva para el "${dateReserva}" ha sido confirmada.</p>

                     <p>Entra en <a href="${URL_FRONT}/login">tu cuenta</a> para ver todos los detalles.</p>
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
            await sendMailUtil(grupoEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        await pool.query('UPDATE reservas SET confirmada = 1 WHERE id = ?', [
            reserva_id,
        ]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default aprobarReservaService;
