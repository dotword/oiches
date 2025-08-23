import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const createAdvertiserService = async (
    userId,
    nombreEmpresa,
    nombreContacto,
    direccion,
    ciudad,
    codigoPostal,
    telefono,
    cif
) => {
    const pool = await getPool();

    // Comprobamos que el mismo usuario no tenga otro perfil de anunciante creado
    const [advertiserResults] = await pool.query(
        'SELECT user_id FROM advertiser_profiles WHERE user_id = ?',
        [userId]
    );
    if (advertiserResults.length)
        throw generateErrorsUtil('Tú cuenta ya está dada de alta.', 404);

    await pool.query(
        `
            INSERT INTO advertiser_profiles (user_id, company_name, tax_id, billing_address, city, postal_code, contact_name, contact_phone, createdAt)
            VALUES (?,?,?,?,?,?,?,?,?)
        `,
        [
            userId,
            nombreEmpresa,
            cif,
            direccion,
            ciudad,
            codigoPostal,
            nombreContacto,
            telefono,
            new Date(),
        ]
    );
};

export default createAdvertiserService;
