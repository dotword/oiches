import getAgenciaRosterService from '../../services/agencias/getAgenciaRosterService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getAgenciaRosterController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const filters = {
            name: req.query.name || '',
            orderField: req.query.orderField || 'fecha',
            order: req.query.order || 'ASC',
        };

        // Verificar que estamos obteniendo el usuario admin correctamente
        const adminUser = await selectUserByIdService(req.user.id);

        if (req.user.id !== userId && adminUser[0].roles !== 'admin') {
            throw generateErrorsUtil(
                'No puedes acceder a esta información',
                400
            );
        }

        // Llamar al servicio para obtener los datos del propietario
        const agenciaList = await getAgenciaRosterService({ userId, filters });

        if (!agenciaList) {
            return;
        }

        res.send({
            status: 'ok',
            agenciaList,
        });
    } catch (error) {
        next(error);
    }
};

export default getAgenciaRosterController;
