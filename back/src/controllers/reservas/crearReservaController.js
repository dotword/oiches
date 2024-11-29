import { crearReservaService } from '../../services/reservas/crearReservaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createReservaSchema from '../../schemas/reservas/createReservaSchema.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
const crearReservaController = async (req, res, next) => {
    try {
        const { fecha, flexible, message } = req.body;

        // Validación con JOI
        await validateSchemaUtil(createReservaSchema, req.body);

        const { id } = req.user;

        const { sala_id } = req.params;
        if (!sala_id) {
            throw generateErrorsUtil(
                'Es necesario seleccionar una sala para reservar.',
                400
            );
        }

        const {
            reserva: { grupoResults, salaResults },
        } = await crearReservaService(fecha, flexible, message, id, sala_id);

        if (!grupoResults || grupoResults.length === 0) {
            throw generateErrorsUtil(
                'No se encontró un grupo asociado al usuario.',
                400
            );
        }
        const grupo_id = grupoResults[0].id;
        if (!salaResults || salaResults.length === 0) {
            throw generateErrorsUtil('Sala no encontrada.', 400);
        }

        res.status(201).json({
            message: 'Reserva realizada con éxito',
            reserva: {
                fecha,
                sala_id,
                grupo_id,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default crearReservaController;
