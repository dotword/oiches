// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../database/getPool.js';

// Importamos los modelos.
import selectUserByEmailService from './selectUserByEmailService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const updateUserPassModel = async (email, recoverPassCode, newPass) => {
    const pool = await getPool();

    // Obtenemos al usuario en base al email recibido.
    const user = await selectUserByEmailService(email);

    // Si no encontramos ningún usuario o si el código es incorrecto lanzamos un error.
    if (!user || user.recoverPassCode !== recoverPassCode)
        throw generateErrorsUtil('Código de recuperación incorrecto', 401);

    // Encriptamos la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPass, 10);

    // Actualizamos el usuario.
    await pool.query(
        `UPDATE usuarios SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default updateUserPassModel;
