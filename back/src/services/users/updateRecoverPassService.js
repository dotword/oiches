import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE Usuarios SET recoverPassCode = ? WHERE email = ?`,
        [recoverPassCode, email]
    );

    const subject = 'Recuperación de contraseña de Oiches ;-)';

    const body = `
         Se ha solicitado la recuperación de contraseña para este email en Oiches. 
                    
                Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}
    
                Si no has sido tú ignora este email.

                Saludos del equipo de Oiches.
                `;

    await sendMailUtil(email, subject, body);
};

export default updateRecoverPassService;
