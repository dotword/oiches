import express from 'express';
import { registerUserController } from '../controllers/users/index.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

export default router;
