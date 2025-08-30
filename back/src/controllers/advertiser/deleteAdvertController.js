import deleteAdvertService from '../../services/advertisers/deleteAdvertService.js';
import getAdvertDetailsService from '../../services/advertisers/getAdvertDetailsService.js';
import { deleteFiles } from '../../utils/uploadFiles.js';

const deleteAdvertController = async (req, res, next) => {
    try {
        const { idAdvert } = req.params;

        // Obtenemos los datos del anuncio
        const advert = await getAdvertDetailsService(idAdvert);

        // Si el anuncio tiene un poster previo lo eliminamos.
        if (advert.image_url) {
            await deleteFiles(advert.image_url);
        }

        await deleteAdvertService(idAdvert);

        res.status(200).json({
            message: 'El anuncio se ha eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteAdvertController;
