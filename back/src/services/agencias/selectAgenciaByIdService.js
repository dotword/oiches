import getPool from '../../database/getPool.js';

const selectAgenciaByIdService = async (idAgencia) => {
    const pool = await getPool();

    const [entry] = await pool.query(
        `
            SELECT 
                A.id,
                A.usuario_id,
                A.nombre,
                (SELECT provincia FROM provincias WHERE provincias.id = A.provincia) AS provincia,
                (SELECT id FROM provincias WHERE provincias.id = A.provincia) AS provinciaId,
                A.descripcion,
                A.web,
                A.published,
                (SELECT email FROM usuarios WHERE usuarios.id = A.usuario_id) AS email,
                A.createdAt
            FROM agencias A
            WHERE A.id = ?
            GROUP BY A.id
        `,
        [idAgencia]
    );

    if (entry.length === 0) {
        return null;
    }

    return {
        ...entry[0],
    };
};

export default selectAgenciaByIdService;
