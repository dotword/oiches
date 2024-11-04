import express from 'express';
import { contactFormHandler } from '../controllers/contacto/contactController.js';

const router = express.Router();

// ruta de contacto
router.post('/contacto', contactFormHandler);

export default router;
