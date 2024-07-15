import getPool from "../../database/getPool.js";

const selectSalaVotesServices = async (id, idSala) => {
    const pool = await getPool();

    const [sala] = await pool.query(
        `
            SELECT s.id, s.usuario_id, s.nombre, s.descripcion, s.direccion, u.email, AVG(IFNULL(v.value,0)) AS votes, s.createdAt,
                   (SELECT COUNT(*) FROM votos_salas WHERE voto_grupo_id = ? AND sala_id = s.id) AS has_voted
            FROM salas s
            LEFT JOIN votos_salas v ON v.sala_id = s.id
            INNER JOIN usuarios u ON u.id = s.usuario_id
            WHERE s.id = ?
            GROUP BY s.id
            ORDER BY s.createdAt DESC
        `,
        [id, idSala]
    );

    return sala;
};

export default selectSalaVotesServices;