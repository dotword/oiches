// Importamos joi.
import Joi from 'joi';
import pdfSchema from '../pdfSchema.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const addPdfSchema = Joi.object({
    rider: pdfSchema.optional().allow(''),
});

export default addPdfSchema;
