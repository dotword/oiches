import listEspecialidadesService from '../../services/agencias/listEspecialidadesService.js';

const listEspecialidadesController = async (req, res, next) => {
    try {
        const especialidades = await listEspecialidadesService();
        res.send({
            status: 'ok',
            data: {
                especialidades,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listEspecialidadesController;
