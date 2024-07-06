import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import pkg from 'jsonwebtoken';
import { JWT_SECRET, URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const aprobarReservaService = async (token, reserva_id) => {
    try {
        const pool = await getPool();

        const decoded = pkg.verify(token, JWT_SECRET);
        const { id: usuario_id } = decoded;

        const [salaInfo] = await pool.query(
            'SELECT confirmada, sala_id, fecha FROM reservas WHERE id = ?',
            [reserva_id]
        );
        // Comprobar que la reserva existe
        if (salaInfo.length === 0)
            throw generateErrorsUtil(
                'No se han encontrado la reserva que intentas borrar.',
                404
            );
        const reservaConfirm = salaInfo[0].confirmada;
        const salaId = salaInfo[0].sala_id;

        // Verificar que la sala le corresponde al usuario
        const [usersalaInfo] = await pool.query(
            'SELECT usuario_id FROM salas WHERE id = ?',
            [salaId]
        );
        const idUser_salaReserva = usersalaInfo[0].usuario_id;

        if (idUser_salaReserva !== usuario_id) {
            throw generateErrorsUtil(
                'No tienes permiso para modificar está reserva.',
                404
            );
        }

        // Comprobar que la reseva no esté confirmada
        if (reservaConfirm === 1) {
            throw generateErrorsUtil('Esta reserva ya está confirmada.', 404);
        }

        // Comprobar que la fecha de la reserva es anterior a hoy
        const dateReserva = salaInfo[0].fecha;
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
        const emailSubject = `Tu reserva "${reservaName}", en Oiches ha sido confirmada.`;

        // Creamos el contenido del email
        const emailBody = `
                    Hola ${grupoNombre}!
        
                    Tu reserva "${reservaName}" ha sido confirmada.

                    Entra en tu cuenta para ver todos los detalles.
  
                    <a href="${URL_FRONT}/users/login">Entrar en mi cuenta</a>

                    

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
