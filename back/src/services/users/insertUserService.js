import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

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
    // Generamos el id del usuario.
    const userId = uuid();

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
             <p>¡Bienvenid@ ${username}!</p>

             <p>Gracias por registrarte en Oiches.</p>
             <p>Para activar tu cuenta, haz clic en el siguiente enlace e introduce este código: <b>${registrationCode}</b></p>
             <p><a href="${URL_FRONT}/validateUser">Activar mi cuenta</a></p><br />
             <p>Saludos del equipo de Oiches.</p>
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
            INSERT INTO usuarios (id, username, email, password, roles, registrationCode ) 
            VALUES (?, ?,?,?,?,?)
        `,
        [userId, username, email, hashedPass, roles, registrationCode]
    );
};

export default insertUserService;
