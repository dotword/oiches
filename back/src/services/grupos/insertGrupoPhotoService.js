import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import { v4 as uuid } from 'uuid';

export const insertGrupoPhotoService = async (photoName, idGrupo) => {
    // Generamos el id de la entrada.
    const photoId = uuid();

    const pool = await getPool();

    const [result] = await pool.query(
        `
        INSERT INTO grupo_fotos (id, name, grupoId)
        VALUES (?, ?,?)
    `,
        [photoId, photoName, idGrupo]
    );

    const { insertId } = result;

    return insertId;
};

export const updateMainGrupoPhotoService = async (photoId, idGrupo) => {
    const pool = await getPool();

    await pool.query(
        'UPDATE grupo_fotos SET es_principal = FALSE WHERE grupoId = ?',
        [idGrupo]
    );

    // Luego, marca la foto seleccionada como principal.
    const [result] = await pool.query(
        'UPDATE grupo_fotos SET es_principal = TRUE WHERE id = ? AND grupoId = ?',
        [photoId, idGrupo]
    );

    if (result.affectedRows === 0) {
        throw generateErrorsUtil(
            'La foto no fue encontrada o no pertenece al músico.',
            404
        );
    }
};

// Función que realiza una consulta a la base de datos para eliminar una foto de una entrada.
export const deleteGrupoPhotoService = async (deletePhoto) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(`DELETE FROM grupo_fotos WHERE id = ?`, [deletePhoto]);
};
