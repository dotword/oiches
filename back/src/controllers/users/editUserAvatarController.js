import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';

import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';

// Importamos el esquema.
const editUserAvatarController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacÃ­o.
        await validateSchemaUtil(editUserAvatarSchema, req.files || {});

        // Obtenemos los datos del usuario para comprobar si ya tiene un avatar previo.
        const user = await selectUserByIdService(userId);

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (user.avatar) {
            await deleteFiles(user.avatar);
        }

        // Guardamos la foto en la carpeta uploads, redimensionamos a un ancho de 100px y obtenemos su nombre.
        const avatarName = await uploadFiles(req.files.avatar, 100);

        // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
        await updateUserAvatarService(avatarName, userId);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
