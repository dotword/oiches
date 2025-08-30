import getAdvertDetailsService from '../../services/advertisers/getAdvertDetailsService.js';
import editAdvertPosterService from '../../services/advertisers/editAdvertPosterService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import editPosterSchema from '../../schemas/conciertos/editPosterSchema.js';
import { uploadFiles, deleteFiles } from '../../utils/uploadFiles.js';

// Importamos el esquema.
const editAdvertPosterController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;

        // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacÃ­o.
        await validateSchemaUtil(editPosterSchema, req.files || {});

        // Obtenemos los datos del anuncio para comprobar si ya tiene una imagen previa.
        const advert = await getAdvertDetailsService(idAdvert);

        // Si el anuncio tiene un poster previo lo eliminamos.
        if (advert.image_url) {
            await deleteFiles(advert.image_url);
        }

        // Guardamos la foto en la carpeta uploads, redimensionamos a un ancho de 1800px y obtenemos su nombre.
        const poster = await uploadFiles(req.files.poster, 1800);

        // Actualizamos los datos del anuncio con el nombre de la foto que hemos obtenido.
        await editAdvertPosterService(poster, idAdvert);

        res.send({
            status: 'ok',
            message: 'Poster actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default editAdvertPosterController;
