import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const borrarReservaAdminService = async (reserva_id) => {
    try {
        const pool = await getPool();

        // Traer el id de la sala
        const [idSala] = await pool.query(
            'SELECT grupo_id, sala_id, fecha FROM reservas WHERE id = ?',
            [reserva_id]
        );

        // Comprobar que la reserva existe
        if (idSala.length === 0)
            throw generateErrorsUtil(
                'No se ha encontrado la reserva que intentas borrar.',
                404
            );

        await pool.query('DELETE FROM reservas WHERE id = ?', [reserva_id]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarReservaAdminService;
