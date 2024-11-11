import sendMailUtil from '../../utils/sendMailUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import contactFormSchema from '../../schemas/users/contactFormSchema.js';

export const contactFormHandler = async (req, res, next) => {
    try {
        const { nombreContacto, nombreSalaArtista, emailFrom, mensaje } =
            req.body;

        const email = 'hola@oiches.com';

        // Validamos el body con Joi.
        await validateSchemaUtil(contactFormSchema, req.body);

        const emailSubject = `Nuevo mensaje de contacto de ${nombreContacto}`;

        const emailBody = `
            <p>Nombre de contacto: ${nombreContacto}</p>
            <p>Email: ${emailFrom}</p>
            <p>Nombre sala o artista: ${nombreSalaArtista}</p>
            <p>Mensaje: ${mensaje}</p>
        `;

        // Envía el correo de contacto
        await sendMailUtil(email, emailSubject, emailBody);

        // éxito
        res.status(200).json({
            message: 'Mensaje de contacto enviado con éxito',
        });
    } catch (error) {
        next(error);
    }
};
