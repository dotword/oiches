import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import { v4 as uuid } from 'uuid';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

export const crearReservaService = async (
    fecha,
    horaInicio,
    horaFin,
    id,
    sala_id
) => {
    try {
        const pool = await getPool();

        // Generamos el id de la entrada.
        const reservaId = uuid();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const reservaFecha = new Date(fecha);
        reservaFecha.setHours(0, 0, 0, 0);

        if (reservaFecha < today) {
            throw generateErrorsUtil(
                'No se puede reservar una fecha anterior a hoy.',
                404
            );
        }
        const [grupoResults] = await pool.query(
            'SELECT id, nombre FROM grupos WHERE usuario_id = ?',
            [id]
        );
        if (grupoResults[0] === undefined) {
            throw generateErrorsUtil(
                'Tienes que publicar tu proyecto musical para poder reservar',
                404
            );
        }

        const grupo_id = grupoResults[0].id;

        const grupoNombre = grupoResults[0].nombre;

        const [salaResults] = await pool.query(
            'SELECT id, nombre, usuario_id FROM salas WHERE id = ?',
            [sala_id]
        );
        const salaUserId = salaResults[0].usuario_id;
        const salaNombre = salaResults[0].nombre;

        const [emailSala] = await pool.query(
            'SELECT email, username FROM usuarios WHERE id = ?',
            [salaUserId]
        );
        const salaEmail = emailSala[0].email;
        const salaUsername = emailSala[0].username;

        // Creamos el asunto del email de verificación.
        const emailSubject = `Has recibido una reserva para tu sala ${salaNombre}, en Oiches.`;

        // Creamos el contenido del email
        const emailBody = `
                    <p>Hola, ${salaUsername}!</p>
        
                    <p>El grupo <b>${grupoNombre}</b> ha realizado una reserva para la sala ${salaNombre}, el día ${fecha}.</p>

                   <p> Entra en tu cuenta para confirmar o rechazar la reserva, o para contactar con el grupo.</p>
  
                    <p><a href="${URL_FRONT}/login">Entrar en mi cuenta</a></p> <br />

                    

                    <p>Saludos del equipo de Oiches.</p>
                 `;

        // Enviamos el email de verificación al usuario.
        try {
            await sendMailUtil(salaEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        await pool.query(
            'INSERT INTO reservas(id, fecha, horaInicio, horaFin, sala_id, grupo_id) VALUES (?, ?, ?, ?, ?, ?)',
            [reservaId, fecha, horaInicio, horaFin, sala_id, grupo_id]
        );

        const [reservaResults] = await pool.query(
            'SELECT * FROM reservas WHERE confirmada =? AND sala_id = ?',
            [1, sala_id]
        );
        reservaResults.forEach((result) => {
            if (fecha === result.fecha && horaInicio === result.horaInicio) {
                throw generateErrorsUtil(
                    'Ya hay una reserva para esta fecha y hora.',
                    402
                );
            }
        });
        return {
            reserva: {
                fecha,
                horaInicio,
                horaFin,
                sala_id,
                grupo_id,
                salaResults,
                grupoResults,
            },
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
