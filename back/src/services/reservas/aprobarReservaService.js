import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const aprobarReservaService = async (reserva_id) => {
    try {
        const pool = await getPool();

        const [salaInfo] = await pool.query(
            'SELECT confirmada, sala_id, fecha, grupo_id FROM reservas WHERE id = ?',
            [reserva_id]
        );

        const reservaConfirm = salaInfo[0].confirmada;
        const dateReserva = salaInfo[0].fecha;
        const grupoId = salaInfo[0].grupo_id;

        // Comprobar que la reseva no esté confirmada
        if (reservaConfirm === 1) {
            throw generateErrorsUtil('Esta reserva ya está confirmada.', 404);
        }

        // Comprobar que la fecha de la reserva es anterior a hoy
        // Convertir la fecha ingresada a un objeto Date
        const dateReservation = new Date(dateReserva);
        // Obtener la fecha de hoy
        const today = new Date();
        // Comprobar fechas
        if (dateReservation < today) {
            throw generateErrorsUtil(
                'No puedes modificar una reserva anterior a la fecha de hoy.',
                404
            );
        }

        // Comprobar el email del grupo
        const [usuarioId] = await pool.query(
            'SELECT usuario_id, nombre FROM grupos WHERE id = ?',
            [grupoId]
        );
        const userGrupoId = usuarioId[0].usuario_id;
        const grupoNombre = usuarioId[0].nombre;

        const [emailGrupo] = await pool.query(
            'SELECT email FROM usuarios WHERE id = ?',
            [userGrupoId]
        );

        const grupoEmail = emailGrupo[0].email;

        // Creamos el asunto del email de verificación.
        const emailSubject = `Tu reserva para el "${dateReserva}", en Oiches ha sido confirmada.`;

        // Creamos el contenido del email
        const emailBody = `
                    Hola ${grupoNombre}!
        
                    Tu reserva para el "${dateReserva}" ha sido confirmada.

                    Entra en tu cuenta para ver todos los detalles.
  
                    <a href="${URL_FRONT}/login">Entrar en mi cuenta</a>

                    

                    Saludos del equipo de Oiches.
                 `;

        // Enviamos el email de verificación al usuario.
        try {
            await sendMailUtil(grupoEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        await pool.query('UPDATE Reservas SET confirmada = 1 WHERE id = ?', [
            reserva_id,
        ]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default aprobarReservaService;
