import getPool from "../../database/getPool.js";

const selectUserByNameService = async (name) => {
  const pool = await getPool();
  if (!name) {
    throw new Error("Falta el nombre");
  }
  const [user] = await pool.query(
    `SELECT id, username, email, roles, active,avatar
    FROM usuarios WHERE username LIKE ?`,
    [`${name}%`]  
  );
  if (!user) {
    throw new Error("No se encontró el usuario");
  }
  return user; 
};

export default selectUserByNameService;
