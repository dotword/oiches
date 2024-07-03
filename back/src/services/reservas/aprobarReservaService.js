import getPool from '../../database/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { URL_FRONT } from '../../../env.js';

const aprobarReservaService = async (reserva_id, id) => {
    try {
        const pool = await getPool();

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

        // Comprobar si la reserva ya está confirmada
        const [salaConfirm] = await pool.query(
            'SELECT confirmada, sala_id FROM reservas WHERE id = ?',
            [reserva_id]
        );
        const confirmSala = salaConfirm[0].confirmada;
        const salaId = salaConfirm[0].sala_id;

        const [userIdSala] = await pool.query(
            'SELECT usuario_id FROM salas WHERE id = ?',
            [salaId]
        );
        const userId_sala = userIdSala[0].usuario_id;

        if (id !== userId_sala) {
            throw {
                status: 403,
                message:
                    'No tiene permisos para confirmar/cancelar la reserva de esta sala.',
            };
        }

        // Creamos el asunto del email de verificación.
        const emailSubject = `Tu reserva "${reservaName}", en Oiches ha sido ${
            confirmSala === 0 ? 'confirmada' : 'cancelada'
        })`;

        // Creamos el contenido del email
        const emailBody = `
                     Hola ${grupoNombre}!
        
                     Tu reserva "${reservaName}" ha sido ${
            confirmSala === 0 ? 'confirmada' : 'cancelada'
        }.

                    ${
                        confirmSala === 0
                            ? 'Entra en tu cuenta para ver todos los detalles.'
                            : 'Ponte en contacto con la sala para saber más detalles.'
                    }
        
                     
        
                     <a href="${URL_FRONT}/users/login">Entrar en mi cuenta</a>
                 `;

        // Enviamos el email de verificación al usuario.
        try {
            await sendMailUtil(grupoEmail, emailSubject, emailBody);
        } catch (error) {
            return;
        }

        if (confirmSala === 0) {
            await pool.query(
                'UPDATE Reservas SET confirmada = 1 WHERE id = ?',
                [reserva_id]
            );
        } else {
            await pool.query(
                'UPDATE Reservas SET confirmada = 0 WHERE id = ?',
                [reserva_id]
            );
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default aprobarReservaService;
