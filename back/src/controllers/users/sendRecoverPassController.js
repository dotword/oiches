import randomstring from "randomstring";
import { resetPasswordService } from '../../services/users/ResetPasswordService.js';
import { insertUserService } from '../../services/users/insertUserService.js';

const sendRecoverPassController = async (req, res, next) => {
try {

//Obtengo el mail de la persona que quiere recuperar password
    const { email } = req.body;

//Compruebo si existe usuario con el email proporcionado
const user = await insertUserService(email);

// Si no existe usuario con ese email, lanzo error
if(!user){
    console.log('No hay un usuario relacionado con ese correo electrónico');
}
// Genero código de recuperación de password
const recoverPassCode = randomstring.generate(10);

// Inserto código de recuperación
await resetPasswordService(email, recoverPassCode);

res.send({
    status: 'ok',
    message: 'Enviado correo de recuperación de constraseña'
});

} catch (error){
    next(error);
    }
};

export default sendRecoverPassController;