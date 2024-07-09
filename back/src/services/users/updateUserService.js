import getPool from "../../database/getPool.js";

const updateUserService = async (userId, updatedFields) => {
  try {
    const pool = await getPool();

    // Crear las partes de la consulta dinámicamente según los campos proporcionados
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updatedFields)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    values.push(userId);

    const query = `
      UPDATE usuarios
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    await pool.query(query, values);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default updateUserService;
