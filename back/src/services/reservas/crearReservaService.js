import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validarFechaReservaService from './validarFechReservaService.js';

// Crear cuerpo del correo
const crearEmailBody = (
    grupoNombre,
    salaNombre,
    formatedFecha,
    flexible,
    message,
    project
) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-size: 12px; font-family: Arial, sans-serif; line-height: 1.4; }
        .small-text { font-size: 8px; }
        a { color: #000000; }
        a:hover { text-decoration: underline; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
    <p>¡Hola!</p>
    <p><b>${grupoNombre}</b> quiere tocar en ${salaNombre} el día ${formatedFecha}.${flexible === 'on' ? ' Es flexible en las fechas.' : ''}</p>
    <p>Mensaje de ${grupoNombre}: "${message}"</p>
    <p>Puedes consultar más detalles sobre ${grupoNombre} en el siguiente enlace: <a href="${URL_FRONT}/grupo/${project}">Visitar ${grupoNombre}</a></p>
    <p>Para gestionar la solicitud, entra en tu cuenta y accede al apartado "Gestionar solicitudes y calendario". Desde allí, podrás elegir si rechazas la solicitud o, si estás interesado/a, marcarla como "Tramitando". En este caso, el músico recibirá una notificación con tu interés, y podrás ponerte en contacto directamente para acordar los detalles del evento.</p>
    <p>Una vez todo esté confirmado, selecciona la opción "Confirmar". ¡Así, el próximo concierto de <b>${grupoNombre}</b> en <b>${salaNombre}</b> quedará programado!</p>
    <p>Quedamos a tu disposición para cualquier consulta.</p>

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

export const crearReservaService = async (
    project,
    fecha,
    flexible,
    message,
    sala_id
) => {
    const pool = await getPool();

    // Validar fecha
    validarFechaReservaService(fecha);

    // Verificar si el grupo existe y está publicado
    const [grupoResults] = await pool.query(
        'SELECT published FROM grupos WHERE id = ?',
        [project]
    );

    console.log(grupoResults[0].published);

    if (grupoResults[0].published !== 1) {
        throw generateErrorsUtil(
            'Tu proyecto musical tiene que estar publicado para poder reservar.',
            404
        );
    }
    const grupoNombre = grupoResults[0].nombre;

    // Verificar si la sala existe
    const [salaResults] = await pool.query(
        'SELECT id, nombre, usuario_id FROM salas WHERE id = ?',
        [sala_id]
    );
    if (!salaResults.length) {
        throw generateErrorsUtil('La sala especificada no existe.', 404);
    }
    const { usuario_id: salaUserId, nombre: salaNombre } = salaResults[0];

    // Comprobar si ya hay una reserva para la misma fecha
    const [reservasResult] = await pool.query(
        'SELECT fecha FROM reservas WHERE sala_id = ? AND grupo_id = ? AND fecha = ?',
        [sala_id, project, fecha]
    );
    if (reservasResult.length) {
        throw generateErrorsUtil(
            'Ya tienes una reserva para esta sala en el mismo día.',
            404
        );
    }

    // Obtener email del usuario de la sala
    const [emailSala] = await pool.query(
        'SELECT email FROM usuarios WHERE id = ?',
        [salaUserId]
    );
    const { email: salaEmail } = emailSala[0];

    // Helper para formatear fechas
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const formatedFecha = formatDate(new Date(fecha));

    // Enviar correo
    const emailSubject = `Solicitud de Concierto de ${grupoNombre} en ${salaNombre}, desde Oiches.`;
    const emailBody = crearEmailBody(
        grupoNombre,
        salaNombre,
        formatedFecha,
        flexible,
        message,
        project
    );

    try {
        await sendMailUtil(salaEmail, emailSubject, emailBody);
    } catch (error) {
        console.error('Error enviando el correo:', error.message);
    }

    // Crear la reserva
    const reservaId = uuid();
    await pool.query(
        'INSERT INTO reservas(id, fecha, sala_id, grupo_id) VALUES (?, ?, ?, ?)',
        [reservaId, fecha, sala_id, project]
    );

    return {
        reserva: {
            id: reservaId,
            fecha,
            sala_id,
            grupo_id: project,
            salaResults,
            grupoResults,
        },
    };
};
