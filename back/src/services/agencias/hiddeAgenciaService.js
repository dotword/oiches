import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const hiddeAgenciaService = async ({ idAgencia }) => {
    try {
        const pool = await getPool();

        const [agenciaInfo] = await pool.query(
            'SELECT published, usuario_id, hidden FROM agencias WHERE id = ?',
            [idAgencia]
        );

        const agenciaPublished = agenciaInfo[0].published;
        const user_id = agenciaInfo[0].usuario_id;
        const agenciaHidden = agenciaInfo[0].hidden;

        // Comprobar que la agencia no esté publicada
        if (agenciaPublished === 0)
            throw generateErrorsUtil('La agencia no está publicada', 404);

        // Si la agencia no está oculta, ocultar
        if (agenciaPublished === 1 && agenciaHidden === 0) {
            await pool.query('UPDATE agencias SET hidden = 1 WHERE id = ?', [
                idAgencia,
            ]);

            // Ponemos todos los grupos de la agencia en no publicados
            await pool.query(
                'UPDATE grupos SET published = 0 WHERE usuario_id = ?',
                [user_id]
            );
        }

        // Si la agencia está oculta, mostrar
        if (agenciaPublished === 1 && agenciaHidden === 1) {
            await pool.query('UPDATE agencias SET hidden = 0 WHERE id = ?', [
                idAgencia,
            ]);

            // Publicamos todos los grupos de la agencias
            await pool.query(
                'UPDATE grupos SET published = 1 WHERE usuario_id = ?',
                [user_id]
            );
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default hiddeAgenciaService;
