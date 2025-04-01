import getPool from '../../database/getPool.js';
import path from 'path';

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

    if (agencia.length === 0) {
        return null;
    }

    const [agenciaEspecialidad] = await pool.query(
        `
            SELECT 
                I.especialidad_id idEspecialidad,
                E.especialidad
            FROM agencias_especialidades I
            LEFT JOIN agencias_especialidad E ON E.id = I.especialidad_id
            WHERE I.agencia_id = ?
            GROUP BY I.especialidad_id
        `,
        [idAgencia]
    );

    const [grupos] = await pool.query(
        `SELECT
            id, nombre, provincia
        FROM grupos G
        WHERE usuario_id = ?
        GROUP BY G.id`,
        [agencia[0].usuario_id]
    );

    // Consulta para obtener las fotos agrupadas por grupo
    const [photos] = await pool.query(`
            SELECT id, name, grupoId, es_principal 
            FROM grupo_fotos
        `);

    // Agrupar las fotos por grupo excluyendo los archivos PDF
    const groupedPhotos = photos.reduce((acc, photo) => {
        if (path.extname(photo.name).toLowerCase() !== '.pdf') {
            if (!acc[photo.grupoId]) {
                acc[photo.grupoId] = [];
            }
            acc[photo.grupoId].push({
                id: photo.id,
                name: photo.name,
                main: photo.es_principal,
            });
        }
        return acc;
    }, {});

    // AÃ±adir las fotos correspondientes a cada grupo
    const gruposPhotos = grupos.map((row) => ({
        ...row,
        fotos: groupedPhotos[row.id] || [],
    }));

    return { ...agencia[0], agenciaEspecialidad, gruposPhotos };
};

export default selectAgenciaByIdService;
