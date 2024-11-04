import sendContactMailUtil from '../../utils/sendContactMailUtil.js';

export const contactFormHandler = async (req, res) => {
    const { nombreContacto, nombreSalaArtista, email, mensaje } = req.body;

    try {
        // Envía el correo de contacto
        await sendContactMailUtil(
            email,
            nombreContacto,
            nombreSalaArtista,
            mensaje
        );

        // éxito
        res.status(200).json({
            message: 'Mensaje de contacto enviado con éxito',
        });
    } catch (error) {
        // error si algo falla
        res.status(500).json({
            message: 'Error al enviar el mensaje de contacto',
        });
    }
};
