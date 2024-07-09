import getPool from "../../database/getPool.js";

const selectUserByIdService = async (userId) => {
  try {
    const pool = await getPool();
    const [users] = await pool.query(
      "SELECT id, email, avatar FROM usuarios WHERE id = ?",
      [userId]
    );
    if (users.length === 0) {
      throw new Error(`Usuario con ID ${userId} no encontrado`);
    }
    return users[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default selectUserByIdService;
