import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import getPool from '../../database/getPool.js';

const editAdvertiserService = async (userId, updatedFields) => {
    const pool = await getPool();

    // Comprobar si los datos del anunciante existen y se corresponden al usuario
    const [advertiser] = await pool.query(
        'SELECT * FROM advertiser_profiles WHERE user_id = ?',
        [userId]
    );

    console.log('advertiser', advertiser);
    if (advertiser.length === 0)
        throw generateErrorsUtil('Anunciante no encontrado', 404);
    if (advertiser[0].user_id !== userId)
        throw generateErrorsUtil(
            'El anunciante no corresponde a este usuario',
            400
        );

    // Crear las partes de la consulta dinámicamente según los campos proporcionados
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updatedFields)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if (fields.length !== 0) {
        values.push(userId);

        const query = `
                UPDATE advertiser_profiles
                 SET ${fields.join(', ')}
                WHERE user_id = ?
            `;

        await pool.query(query, values);
    }
};

export default editAdvertiserService;
