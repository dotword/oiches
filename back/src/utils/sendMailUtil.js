// Importamos las dependencias.
import 'dotenv/config';
import nodemailer from 'nodemailer';

// Importamos los errores.

// Obtenemos las variables de entorno necesarias.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// Creamos un transporte para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Función que envía un mail a un usuario.
const sendMailUtil = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
        // generateErrorsUtils
    }
};

export default sendMailUtil;
