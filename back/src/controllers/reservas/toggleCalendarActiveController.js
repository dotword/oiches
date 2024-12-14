import toggleCalendarActiveService from '../../services/reservas/toggleCalendarActiveService.js';

const toggleCalendarActiveController = async (req, res, next) => {
    const { idSala } = req.params;
    const { calendarActive } = req.body;

    try {
        await toggleCalendarActiveService(idSala, calendarActive);

        res.send({
            status: 'ok',
            message: 'Calendario actualizado.',
        });
    } catch (error) {
        next(error);
    }
};

export default toggleCalendarActiveController;
