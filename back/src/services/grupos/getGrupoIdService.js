import getPool from "../../database/getPool.js";
import generateErrorsUtil from "../../utils/generateErrorsUtil.js";

const getGrupoById = async (id) => {
    const pool = await getPool();

    const [grupo] = await pool.query(
        `
            SELECT * FROM grupos WHERE id = ?
        `,
        [id]
    );

    if (grupo.length === 0) {
        throw generateErrorsUtil('Grupo no encontrado', 404);
    }

    return grupo[0];
};

export default getGrupoById;