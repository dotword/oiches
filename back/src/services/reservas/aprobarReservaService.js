import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';

const aprobarReservaService = async (reserva_id) => {
    try {
        const pool = await getPool();

        // Comprobar si la reserva ya está confirmada
        const [salaConfirm] = await pool.query(
            'SELECT confirmada FROM reservas WHERE id = ?',
            [reserva_id]
        );
        const confirmSala = salaConfirm[0].confirmada;
        // const salaId = salaConfirm[0].sala_id;

        // Comprobar el email del grupo
        const [grupoConfirm] = await pool.query(
            'SELECT grupo_id, nombre FROM reservas WHERE id = ?',
            [reserva_id]
        );
        const grupoId = grupoConfirm[0].grupo_id;
        const reservaName = grupoConfirm[0].nombre;

        const [emailGrupo] = await pool.query(
            'SELECT email, nombre FROM grupos WHERE id = ?',
            [grupoId]
        );
        const grupoEmail = emailGrupo[0].email;
        const grupoNombre = emailGrupo[0].nombre;

        if (confirmSala === 1) {
            throw {
                httpStatus: 400,
                message: 'La reserva ya ha sido confirmada',
            };
        }

        // Creamos el asunto del email de verificación.
        const emailSubject = `Tu reserva "${reservaName}", en Oiches ha sido confirmada.)`;

        // Creamos el contenido del email
        const emailBody = `
             Hola ${grupoNombre}!

             Tu reserva "${reservaName}" ha sido confirmada.

             Entra en tu cuenta para ver todos los detalles.

             <a href="${URL_FRONT}/users/login">Entrar en mi cuenta</a>
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
