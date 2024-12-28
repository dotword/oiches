import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import fechasDisponiblesSchema from '../../schemas/reservas/fechasDisponiblesSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import fechasDisponiblesSalaService from '../../services/reservas/fechasDisponiblesSalaService.js';

const fechasDisponiblesSalaController = async (req, res, next) => {
    const { idSala } = req.params;
    const { fechaDisponible } = req.body;

    try {
        // Validación con JOI
        await validateSchemaUtil(fechasDisponiblesSchema, req.body);

        // Validar que las fechas sean correctas
        if (!fechaDisponible)
            throw generateErrorsUtil(
                'Debes seleccionar una fecha disponible.',
                400
            );

        await fechasDisponiblesSalaService(idSala, fechaDisponible);

        res.send({
            status: 'ok',
            message: 'Fechas disponible registrada.',
        });
    } catch (error) {
        next(error);
    }
};

export default fechasDisponiblesSalaController;
