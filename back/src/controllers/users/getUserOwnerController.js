import getUserOwnerService from '../../services/users/getUserOwnerService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getUserOwnerController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Verificar que estamos obteniendo el usuario admin correctamente
        const adminUser = await selectUserByIdService(req.user.id);

        if (req.user.id !== userId && adminUser[0].roles !== 'admin') {
            throw generateErrorsUtil(
                'No puedes acceder a esta información',
                400
            );
        }

        // Llamar al servicio para obtener los datos del propietario
        const ownerList = await getUserOwnerService(userId);

        if (!ownerList) {
            throw generateErrorsUtil(
                'No se encontraron datos para este usuario',
                404
            );
        }

        res.send({
            status: 'ok',
            data: {
                ownerList,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getUserOwnerController;
