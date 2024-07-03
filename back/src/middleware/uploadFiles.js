import sharp from 'sharp';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';
import path from 'path';

const uploadFiles = async (req, res, next) => {
    try {
        // Si no existe archivo, lanzamos un error.
        if (!req.files || Object.keys(req.files).length === 0) {
            const err = generateErrorsUtil('Faltan campos', 400);
            return next(err);
        }

        // Obtener la ruta absoluta del directorio 'uploads'
        const uploadsDir = path.resolve(
            path.join(import.meta.dirname, '..', 'uploads')
        );

        // Iterar sobre los archivos subidos
        for (const [key, file] of Object.entries(req.files)) {
            // Generar un nombre de archivo único si no se proporciona un nombre de campo
            const fileName = key ? `${key}-${file.name}` : file.name;
            const filePath = path.join(uploadsDir, fileName);

            // Redimensionar la imagen con Sharp
            await sharp(file.data)
                .resize(300, 300)
                .toFormat('jpeg')
                .toFile(filePath);
        }

        res.status(200).json({ message: 'Archivos cargados correctamente' });
    } catch (err) {
        next(err);
    }
};

export default uploadFiles;
