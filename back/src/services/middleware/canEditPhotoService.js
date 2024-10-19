import getPool from '../../database/getPool.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';

const canEditPhotoService = async (deletePhoto, userId) => {
    const pool = await getPool();

    const [photoExists] = await pool.query(
        `SELECT salaId FROM sala_fotos WHERE id = ?`,
        [deletePhoto]
    );

    const photoOwnerId = photoExists[0].salaId;

    // Comprobar que la foto existe
    if (!photoExists[0])
        throw generateErrorsUtil(
            'No se encuentra el archivo que intentas borrar',
            400
        );
    // Comprobar que es user es dueño de la foto
    const [salaOwner] = await pool.query(
        `SELECT usuario_id FROM salas WHERE id = ?`,
        [photoOwnerId]
    );

    // Comprobar que es user admin
    const [userAdmin] = await pool.query(
        `SELECT roles FROM usuarios WHERE id = ?`,
        [userId]
    );

    // // Si no somos los propietarios lanzamos un error.
    if (salaOwner[0].usuario_id !== userId && userAdmin[0].roles !== 'admin')
        throw generateErrorsUtil(
            'El usuario no está autorizado para borrar esta foto',
            409
        );
};

export default canEditPhotoService;
