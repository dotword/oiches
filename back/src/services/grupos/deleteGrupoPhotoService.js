// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para eliminar una foto de una entrada.
const deleteGrupoPhotoService = async (photoId) => {
    const pool = await getPool();

    // Eliminamos la foto.
    await pool.query(`DELETE FROM grupo_fotos WHERE id = ?`, [photoId]);
};

export default deleteGrupoPhotoService;
