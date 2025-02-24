import getPool from '../../database/getPool.js';

const selectAgenciaByIdService = async (idAgencia) => {
    const pool = await getPool();

    const [agencia] = await pool.query(
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
                A.hidden,
                (SELECT email FROM usuarios WHERE usuarios.id = A.usuario_id) AS email,
                (SELECT avatar FROM usuarios WHERE usuarios.id = A.usuario_id) AS avatar,
                A.createdAt
            FROM agencias A
            WHERE A.id = ?
            GROUP BY A.id
        `,
        [idAgencia]
    );

    const [grupos] = await pool.query(
        `SELECT id, nombre, provincia FROM grupos WHERE usuario_id = ?`,
        [agencia[0].usuario_id]
    );

    if (agencia.length === 0) {
        return null;
    }

    return { ...agencia[0], grupos };
};

export default selectAgenciaByIdService;
