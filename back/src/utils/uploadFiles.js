import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { UPLOADS_DIR } from '../../env.js';
import generateErrorsUtil from './generateErrorsUtil.js';

export const uploadFiles = async (img, width) => {
export const uploadFiles = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadDir = path.join(process.cwd(), `./src/${UPLOADS_DIR}`);

        // Si no existe la carpeta upolads la creamos, si no accedemos a ella
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir);
        }

        if (!img) {
            throw generateErrorsUtil('No se ha subido ningún archivo.', 404);
        }

        // Obtiene la extensión del archivo subido
        const ext = path.extname(img.name).toLowerCase();

        // Generamos el nombre del archivo
        const imgName = `${uuid()}${ext}`;

        const outputFilePath = path.join(uploadDir, imgName);

        if (ext === '.pdf') {
            // Guardamos el archivo
            await fs.writeFile(outputFilePath, img.data);
            return imgName;
        }

        // crear un objeto de tipo sharp
        const sharpImg = sharp(img.data);

        sharpImg.resize(!width ? 600 : width);
        await sharpImg.toFile(outputFilePath); // Guardando el foto en el  disco

        return imgName;
    } catch (error) {
        throw generateErrorsUtil('Error al guardar la imagen', 500);
    }
};

export default uploadFiles;

export const deleteFiles = async (imgName) => {
    try {
        // Ruta absoluta al archivo que queremos eliminar.
        const imgPath = path.join(
            process.cwd(),
            `./src/${UPLOADS_DIR}`,
            imgName
        );

        // Comprobamos si la imagen existe con la ayuda del método "access".
        try {
            await fs.access(imgPath);
        } catch {
            // Si el método anterior lanza un error quiere decir que la imagen no existe.
            // En ese caso finalizamos la función.
            return;
        }

        // Eliminamos erl archivo de la carpeta de subida de archivos.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        throw generateErrorsUtil('Error al eliminar el archivo del disco', 409);
    }
};
