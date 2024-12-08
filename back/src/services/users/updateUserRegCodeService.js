// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../database/getPool.js';

//importamos funcion para generar errores
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

// Función que realiza una consulta a la base de datos para activar un usuario.
const updateUserRegCodeService = async (registrationCode) => {
    const pool = await getPool();

    // Comprobamos si existe un usuario con ese código de registro.
    const [user] = await pool.query(
        `SELECT id FROM usuarios WHERE registrationCode = ?`,
        [registrationCode]
    );

    if (!user) throw generateErrorsUtil('Código de registro incorrecto', 403);

    // Actualizamos el usuario.
    if (user) {
        await pool.query(
            `UPDATE usuarios SET active = true, registrationCode = null WHERE registrationCode = ?`,
            [registrationCode]
        );
    }
};

export default updateUserRegCodeService;
