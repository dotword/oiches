import sharp from 'sharp';
import generateErrorsUtil from '../utils/generateErrorsUtil.js';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config;

const {UPLOADS_DIR} = process.env;

const uploadPhotos = async (req, res, next) => {
    try {

        // Si no existen fotos, lanzar error
        if (!req.files || Object.keys(req.files).length === 0) {
            const err = generateErrorsUtil('Faltan campos', 400);
            return next(err);
        }

        const uploadsDir = path.resolve(
            path.join(import.meta.dirname, '..', UPLOADS_DIR)
        );

        // Iterar en las imagenes
        for (const [key, file] of Object.entries(req.files)) {
            // Generar nombre unico fotos con uuid
            const fileName = `${uuidv4()}.jpeg`;
            const filePath = path.join(uploadsDir, fileName);

            // Modificar imagenes con sharp
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

export default uploadPhotos;