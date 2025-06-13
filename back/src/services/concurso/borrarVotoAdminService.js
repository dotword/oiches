import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const borrarVotoAdminService = async (idVoto) => {
    try {
        const pool = await getPool();

        // Traer el id del voto
        const [id] = await pool.query(
            'SELECT id FROM contest_votes WHERE id = ?',
            [idVoto]
        );

        // Comprobar que el voto existe
        if (id.length === 0)
            throw generateErrorsUtil(
                'No se ha encontrado el voto que intentas borrar.',
                404
            );

        await pool.query('DELETE FROM contest_votes WHERE id = ?', [idVoto]);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default borrarVotoAdminService;
