import editGrupoService from '../../services/grupos/editGrupoService.js';
import generateErrorsUtil from '../../utils/generateErrorsUtil.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import createEditGrupoSchema from '../../schemas/grupos/editGrupoSchema.js';
import selectGrupoByIdService from '../../services/grupos/selectGrupoByIdService.js';
// import { uploadFiles } from '../../utils/uploadFiles.js';
// import { insertGrupoPhotoService } from '../../services/grupos/insertGrupoPhotoService.js';
import { insertGrupoGenerosService } from '../../services/grupos/insertGrupoGenerosService.js';

const editGrupoController = async (req, res, next) => {
    try {
        const { idGrupo } = req.params;

        const { nombre, provincia, honorarios, biografia, newGenero } =
            req.body;

        // Validamos el body con Joi.
        // await validateSchemaUtil(
        //     createEditGrupoSchema,
        //     Object.assign(req.body, req.files || {})
        // );

        if (Object.keys(req.body).length === 0 && req.files === undefined)
            throw generateErrorsUtil('No se envió ninguna información', 400);

        // Obtenemos la información del grupo
        const grupo = await selectGrupoByIdService(idGrupo);

        // Actualizar solo los campos que se proporcionan
        const updatedFields = {};

        if (nombre !== undefined) updatedFields.nombre = nombre;
        if (provincia !== undefined) updatedFields.provincia = provincia;
        // if (newGenero !== undefined) updatedFields.newGenero = newGenero;
        if (honorarios !== undefined) updatedFields.honorarios = honorarios;
        if (biografia !== undefined) updatedFields.biografia = biografia;

        console.log('newGen ', newGenero);

        console.log('generos ', grupo.genero);

        await editGrupoService(idGrupo, updatedFields);

        // Añadir nuevos géneros al grupo
        if (newGenero) {
            const newGeneros = [];
            for (const genero of newGenero) {
                await insertGrupoGenerosService(genero, idGrupo);
                newGeneros.push({ generoId: genero });
            }
        }

        // // Subir archivo a grupo
        // // Si el grupo tiene más de 5 archivos lanzamos un error.
        // if (req.files !== null && grupo.photos.length > 4)
        //     throw generateErrorsUtil(
        //         'No se pueden subir más de 5 archivos al grupo',
        //         409
        //     );

        // if (req.files !== null) {
        //     // Recorremos las fotos.
        //     for (const file of Object.values(req.files)) {
        //         // Guardamos la foto en la carpeta uploads y obtenemos su nombre.
        //         const photoName = await uploadFiles(file, 600);

        //         // Guardamos la foto en la base de datos y obtenemos el id de la misma.
        //         await insertGrupoPhotoService(photoName, idGrupo);
        //     }
        // }

        res.send({
            status: 'ok',
            message: 'Grupo actualizado!!',
        });
    } catch (error) {
        next(error);
    }
};

export default editGrupoController;
