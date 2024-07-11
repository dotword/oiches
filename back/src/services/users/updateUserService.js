import getPool from "../../database/getPool.js";

const updateUserService = async (userId, email) => {

    const pool = await getPool();

    await pool.query(
        `
            UPDATE usuarios
            SET email = ?
            WHERE id = ?
        `,
        [email, userId]
    );
}

export default updateUserService;