import getPool from '../database/getPool.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

const salaExists = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos el id de la sala de los path params.
        const { idSala } = req.params;

        const [sala] = await pool.query(
            `
                SELECT id FROM salas WHERE id=?
            `,
            [idSala]
        );

        if (!sala.length) {
            throw generateErrorsUtil('Sala no encontrada', 400);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default salaExists;
