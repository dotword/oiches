import editConciertoService from '../../services/conciertos/editConciertoService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editConciertoSchema from '../../schemas/conciertos/editConciertoSchema.js';

const editConciertoController = async (req, res, next) => {
    try {
        const { conciertoId } = req.params;

        const { fecha, hora, precio, link } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(editConciertoSchema, Object.assign(req.body));

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (fecha !== undefined) updatedFields.fecha = fecha;
        if (hora !== undefined) updatedFields.hora = hora;
        if (precio !== undefined) updatedFields.precio = precio;
        if (link !== undefined) updatedFields.link = link;

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
