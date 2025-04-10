import editConciertoService from '../../services/conciertos/editConciertoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editConciertoSchema from '../../schemas/conciertos/editConciertoSchema.js';

const editConciertoController = async (req, res, next) => {
    try {
        const { conciertoId } = req.params;

        const cleanField = (val) => (val === 'null' || val === '' ? null : val);

        req.body.precioAnticipada = cleanField(req.body.precioAnticipada);
        req.body.precio = cleanField(req.body.precio);

        const {
            title,
            fecha,
            hora,
            precioAnticipada,
            precio,
            otroTipoEntrada,
            description,
            link,
            salaLink,
        } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(editConciertoSchema, Object.assign(req.body));

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (title !== undefined) updatedFields.title = title;
        if (fecha !== undefined) updatedFields.fecha = fecha;
        if (hora !== undefined) updatedFields.hora = hora;
        if (precioAnticipada !== undefined)
            updatedFields.precioAnticipada = precioAnticipada;
        if (precio !== undefined) updatedFields.precio = precio;
        if (otroTipoEntrada !== undefined)
            updatedFields.otroTipoEntrada = otroTipoEntrada;
        if (description !== undefined) updatedFields.description = description;
        if (link !== undefined) updatedFields.link = link;
        if (salaLink !== undefined) updatedFields.salaLink = salaLink;

        await editConciertoService(conciertoId, updatedFields);

        res.send({
            status: 'ok',
            message: 'Concierto actualizado',
        });
    } catch (error) {
        next(error);
    }
};

export default editConciertoController;
