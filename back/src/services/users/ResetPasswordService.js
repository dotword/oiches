import { sendMailUtil } from '../../utils/sendMailUtil.js';
import getPool from "../../database/getPool.js";

// Realizo consulta en la base de datos
const RecoverPass = async (email, recoverPassCode) => {
    const pool = await getPool();

    // Actualizo código de recuperación de password
    await pool.query(`UPDATE Usuarios SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);

// Creo asunto del email de recuperación
const emailSubject = 'Recuperación de contraseña Oiches';

// Creo el contenido del email
const emailContent = `Se ha solicitado la recuperación de contraseña para este email en Oiches. 
                
            Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

            Si no has sido tú ignora este email.`;

// Envío email de verificación
await sendMailUtil(email, emailSubject, emailContent);
};

export default RecoverPass;
