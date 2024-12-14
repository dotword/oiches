import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import deleteFechaDisponibleSchema from '../../schemas/reservas/deleteFechaDisponibleSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import deleteFechasDisponiblesSalaService from '../../services/reservas/deleteFechasDisponiblesSalaService.js';

const deleteFechasDisponiblesSalaController = async (req, res, next) => {
    const { idSala } = req.params;
    const { fechaDisponible } = req.body;

    try {
        // Validación con JOI
        await validateSchemaUtil(deleteFechaDisponibleSchema, req.body);

        // Validar que las fechas sean correctas
        if (!fechaDisponible)
            throw generateErrorsUtil(
                'Debes seleccionar una fecha disponible.',
                400
            );

        await deleteFechasDisponiblesSalaService(idSala, fechaDisponible);

        res.send({
            status: 'ok',
            message: 'Fecha actualizada.',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteFechasDisponiblesSalaController;
