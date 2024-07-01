import getPool from "../database/getPool.js";
import generateErrorsUtil from "../utils/generateErrorsUtil.js";

const salaExists = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.usuario_id || req.user?.id;

    const [user] = await pool.query(
      `
        SELECT id, roles FROM usuarios WHERE id=?
      `,
      [userId]
    );

    if (!user.length) {
      throw generateErrorsUtil("Usuario no encontrado", 400);
    }

    // Comprobar si el usuario tiene el rol de 'sala'
    if (user[0].roles !== "sala") {
      throw generateErrorsUtil("El usuario no tiene permisos de sala", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default salaExists;