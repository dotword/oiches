import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const borrarReservaSalaService = async (reserva_id) => {
    try {
        const pool = await getPool();

        // Traer el id de la sala
        const [idSala] = await pool.query(
            'SELECT grupo_id, fecha FROM reservas WHERE id = ?',
            [reserva_id]
        );
        const grupoId = idSala[0].grupo_id;
        const dateReserva = idSala[0].fecha;

        // Comprobar que la reserva existe
        if (idSala.length === 0)
            throw generateErrorsUtil(
                'No se han encontrado la reserva que intentas borrar.',
                404
            );

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
        const emailSubject = `Tu reserva para el ${dateReserva} en Oiches ha sido cancelada.`;

        // Creamos el contenido del email
        const emailBody = `
                    <p>Hola, ${grupoNombre}!</p>
        
                    <p>Tu reserva para el "${dateReserva}" ha sido cancelada.</p>

                    <p>Ponte en contacto con la sala para saber más detalles.</p>                
        
                    <p><a href="${URL_FRONT}/login">Entrar en mi cuenta</a></p><br />      

                    <p>Saludos del equipo de Oiches.</p>
                 `;

        // Enviamos el email de verificación al usuario.
        try {
            await sendMailUtil(grupoEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        await pool.query('DELETE FROM reservas WHERE id = ?', [reserva_id]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarReservaSalaService;
