import getPool from "../../database/getPool.js";

const insertCommentSalaService = async (comment, idSala, grupo_id) => {
    const pool = await getPool();

    await pool.query(
        `
            INSERT INTO sala_comments (descripcion, sala_id, grupo_id)
            VALUES (?, ?, ?)
        `,
        [comment, idSala, grupo_id]
    );
};

export default insertCommentSalaService;