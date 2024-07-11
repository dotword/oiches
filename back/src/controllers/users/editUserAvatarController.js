
import selectUserByIdService from '../../services/users/selectUserByIdService.js'
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';

import {
    uploadFiles,
    deleteFiles,
} from '../../utils/uploadFiles.js';


import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema.
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js'

const editUserAvatarController = async (req, res, next) => {
    try {
        console.log(req.files.avatar);

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacío.
        await validateSchemaUtil(editUserAvatarSchema, req.files || {});

        // Obtenemos los datos del usuario para comprobar si ya tiene un avatar previo.
        const user = await selectUserByIdService(req.user.id);

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (user.avatar) {
            await deleteFiles(user.avatar);
        }
    
        // Guardamos el avatar en la carpeta de subida de archivos
        const avatarName = await uploadFiles(req.files.avatar);

        // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
        await updateUserAvatarService(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
