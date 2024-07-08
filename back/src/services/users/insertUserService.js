import bcrypt from 'bcrypt';

import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const insertUserService = async (
    username,
    email,
    password,
    roles,
    registrationCode
) => {
    const pool = await getPool();

    // Buscamos en la base de datos algún usuario con ese nombre.
    let [users] = await pool.query(
        `SELECT id FROM usuarios WHERE username = ?`,
        [username]
    );

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0)
        throw generateErrorsUtil(
            'El nombre de usuario ya está registrado',
            409
        );

    // Comprobar que el email no esté registrado
    [users] = await pool.query(` SELECT id FROM usuarios WHERE email=?`, [
        email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0)
        throw generateErrorsUtil('El email ya está registrado', 409);

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Oiches:)';

    // Creamos el contenido del email
    const emailBody = `
             ¡Bienvenid@ ${username}!

             Gracias por registrarte en Oiches. Para activar tu cuenta, haz clic en el siguiente enlace:

             <a href="${URL_FRONT}/users/validate/${registrationCode}">Activar mi cuenta</a>
         `;

    // Enviamos el email de verificación al usuario.
    try {
        await sendMailUtil(email, emailSubject, emailBody);
    } catch (error) {
        return;
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Si el email NO se encuentra insertar en la DB
    await pool.query(
        `
            INSERT INTO usuarios (username, email, password, roles, registrationCode ) 
            VALUES (?,?,?,?,?)
        `,
        [username, email, hashedPass, roles, registrationCode]
    );
};

export default insertUserService;
