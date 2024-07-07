import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { UPLOADS_DIR } from '../../env.js';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';

export const uploadPhotos = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadDir = path.join(process.cwd(), `./src/${UPLOADS_DIR}`);

        // Si no existe la carpeta upolads la creamos, si no accedemos a ella
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir);
        }

        // crear un objeto de tipo sharp
        const sharpImg = sharp(img.data);

        sharpImg.resize(width);

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(uploadDir, imgName);

        await sharpImg.toFile(pathImg); // Guardando el archivo en el  disco

        return imgName;
    } catch (error) {
        throw generateErrorsUtil('Error al guardar la imagen', 500);
    }
};
