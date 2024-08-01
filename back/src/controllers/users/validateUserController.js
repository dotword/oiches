import updateUserRegCodeService from '../../services/users/updateUserRegCodeService.js';

const validateUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

      
        if (!registrationCode) {
            return res.status(400).send({
                status: 'error',
                message: 'El código de registro es requerido',
            });
        }

       
        await updateUserRegCodeService(registrationCode);

      
        res.send({
            status: 'ok',
            message: 'Usuario activado correctamente',
        });
    } catch (error) {
        
        next(error);
    }
};

export default validateUserController;
