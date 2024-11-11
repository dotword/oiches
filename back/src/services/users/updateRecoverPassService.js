import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';

const updateRecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE usuarios SET recoverPassCode = ? WHERE email = ?`,
        [recoverPassCode, email]
    );

    const subject = 'Recuperación de contraseña de Oiches ;-)';

    const body = `
         <p>Se ha solicitado la recuperación de contraseña para este email en Oiches. </p>
                    
               <p>Utiliza este código para crear una nueva contraseña: ${recoverPassCode}<br />
                en el siguiente enlace: <a href="${URL_FRONT}/users/password">Cambiar contraseña</a></p>

                <p>Si no has sido tú, ignora este email.</p><br />

                <p>Saludos del equipo de Oiches.</p>
                `;

    await sendMailUtil(email, subject, body);
};

export default updateRecoverPassService;
