import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';

const updateRecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE Usuarios SET recoverPassCode = ? WHERE email = ?`,
        [recoverPassCode, email]
    );

    const subject = 'Recuperación de contraseña de Oiches ;-)';

    const body = `
         Se ha solicitado la recuperación de contraseña para este email en Oiches. 
                    
                Utiliza el este código para crear una nueva contraseña: ${recoverPassCode}
                en el siguiente enlace <a href="${URL_FRONT}/users/password">Cambiar contraseña</a>

                Si no has sido tú ignora este email.

                Saludos del equipo de Oiches.
                `;

    await sendMailUtil(email, subject, body);
};

export default updateRecoverPassService;
