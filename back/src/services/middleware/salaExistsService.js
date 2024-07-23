import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const salaExistsService = async (idSala) => {
    const pool = await getPool();

    const [sala] = await pool.query(
        `
            SELECT id FROM salas WHERE id=?
        `,
        [idSala]
    );

    if (!sala.length) {
        throw generateErrorsUtil('Sala no encontrada', 400);
    }
};

export default salaExistsService;
