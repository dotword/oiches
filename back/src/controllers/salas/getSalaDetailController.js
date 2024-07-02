import selectSalaByIdService from '../../services/salas/selectSalaByIdService.js';

const getSalaDetailController = async (req, res, next) => {
    try {
        const { idSala } = req.params;

        // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
        // habrá momentos en los que no exista "req.sala". Con la interrogación indicamos
        // a JavaScript que "sala" puede ser undefined.
        const sala = await selectSalaByIdService(idSala, req.sala?.id);

        res.send({
            status: 'ok',
            data: {
                sala,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getSalaDetailController;
