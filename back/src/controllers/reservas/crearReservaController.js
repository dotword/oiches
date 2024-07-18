import { crearReservaService } from '../../services/reservas/crearReservaService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createReservaSchema from '../../schemas/reservas/createReservaSchema.js';

const crearReservaController = async (req, res, next) => {
    try {
        const { fecha, horaInicio, horaFin } = req.body;

        // Validación con JOI
        await validateSchemaUtil(createReservaSchema, req.body);

        const { token } = req.headers;

        const { sala_id } = req.params;
        if (!sala_id) {
            return res.status(400).json({
                message: 'Es necesario seleccionar una sala para reservar.',
            });
        }

        const {
            reserva: { grupoResults, salaResults },
        } = await crearReservaService(
            fecha,
            horaInicio,
            horaFin,
            token,
            sala_id
        );

        if (!grupoResults || grupoResults.length === 0) {
            return res.status(404).json({
                message: 'No se encontró un grupo asociado al usuario.',
            });
        }
        const grupo_id = grupoResults[0].id;
        if (!salaResults || salaResults.length === 0) {
            return res.status(404).json({ message: 'Sala no encontrada.' });
        }

        res.status(200).json({
            message: 'Reserva realizada con éxito',
            reserva: {
                fecha,
                horaInicio,
                horaFin,
                sala_id,
                grupo_id,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default crearReservaController;
