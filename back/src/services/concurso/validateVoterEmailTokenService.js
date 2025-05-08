// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../database/getPool.js';

//importamos funcion para generar errores
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

// Función que realiza una consulta a la base de datos para validar un email.
const validateVoterEmailTokenService = async (verification_token) => {
    const pool = await getPool();

    // Comprobamos si existe un email con ese token.
    const [voterRows] = await pool.query(
        `SELECT id, token_expires FROM voters WHERE verification_token = ?`,
        [verification_token]
    );

    if (voterRows.length === 0)
        throw generateErrorsUtil('Código de validación incorrecto', 403);

    const voter = voterRows[0];

    // Comprobamos que el token no haya caducado.
    const currentDate = new Date();
    const tokenExpired = new Date(voter.token_expires);
    if (currentDate > tokenExpired) {
        throw generateErrorsUtil('El código de verificación ha caducado', 403);
    }

    // Validamos el email.

    await pool.query(
        `UPDATE voters SET verified = TRUE, verified_at = NOW() WHERE verification_token = ?`,
        [verification_token]
    );
};

export default validateVoterEmailTokenService;
