import transport from './sendMailUtil.js'; // Lo usamos por que ya tiene la info del transporter
import generateErrorsUtil from './generateErrorsUtil.js';

// Función para enviar el correo de contacto
const sendContactMailUtil = async (
    fromEmail,
    nombreContacto,
    nombreSalaArtista,
    mensaje
) => {
    try {
        const mailOptions = {
            from: fromEmail, // Correo del usuario que envía el mensaje
            subject: `Nuevo mensaje de contacto de ${nombreContacto}`,
            text: `Nombre de Contacto: ${nombreContacto}\nNombre Sala o Artista: ${nombreSalaArtista}\nMensaje: ${mensaje}`,
            html: `<p>Nombre de Contacto: ${nombreContacto}</p>
                   <p>Nombre Sala o Artista: ${nombreSalaArtista}</p>
                   <p>Mensaje: ${mensaje}</p>`,
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        generateErrorsUtil('Error al enviar el correo de contacto.', 500);
    }
};

export default sendContactMailUtil;
