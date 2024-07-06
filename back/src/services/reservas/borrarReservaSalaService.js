import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET, URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const borrarReservaSalaService = async (token, reserva_id) => {
    try {
        const pool = await getPool();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        // Traer el id de la sala
        const [idSala] = await pool.query(
            'SELECT sala_id FROM reservas WHERE id = ?',
            [reserva_id]
        );

        // Comprobar que la reserva existe
        if (idSala.length === 0)
            throw generateErrorsUtil(
                'No se han encontrado la reserva que intentas borrar.',
                404
            );

        // Comprobar que la reserva no esté confirmada
        // const reservaConfirm = idSala[0].confirmada;
        // if (reservaConfirm === 1)
        //     throw generateErrorsUtil(
        //         'La reserva esta confirmada, no puede borrar una reserva confirmada.'
        //     );

        const sala_id = idSala[0].sala_id;

        // Verificar que la sala le corresponde al usuario
        const [userIdSala] = await pool.query(
            'SELECT usuario_id FROM salas WHERE id = ?',
            [sala_id]
        );
        const idUser_salaReserva = userIdSala[0].usuario_id;

        if (idUser_salaReserva !== usuario_id)
            throw generateErrorsUtil(
                'No tienes permiso para borrar está reserva.',
                404
            );

        // Comprobar el email del grupo
        const [grupoConfirm] = await pool.query(
            'SELECT grupo_id, nombre FROM reservas WHERE id = ?',
            [reserva_id]
        );

        if (grupoConfirm.length === 0) {
            throw {
                httpStatus: 400,
                message: 'No existe esa reserva',
            };
        }
        const grupoId = grupoConfirm[0].grupo_id;
        const reservaName = grupoConfirm[0].nombre;

        const [emailGrupo] = await pool.query(
            'SELECT email, nombre FROM grupos WHERE id = ?',
            [grupoId]
        );
        const grupoEmail = emailGrupo[0].email;
        const grupoNombre = emailGrupo[0].nombre;

        // Creamos el asunto del email de verificación.
        const emailSubject = `Tu reserva "${reservaName}", en Oiches ha sido cancelada.`;

        // Creamos el contenido del email
        const emailBody = `
                    Hola ${grupoNombre}!
        
                    Tu reserva "${reservaName}" ha sido cancelada.

                    Ponte en contacto con la sala para saber más detalles.                    
        
                    <a href="${URL_FRONT}/users/login">Entrar en mi cuenta</a>

                    

                    Saludos del equipo de Oiches.
                 `;

        // Enviamos el email de verificación al usuario.
        try {
            await sendMailUtil(grupoEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        await pool.query('DELETE FROM Reservas WHERE id = ?', [reserva_id]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarReservaSalaService;
