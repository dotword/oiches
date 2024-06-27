import express from 'express';
import { registerUserController } from '../controllers/users/index.js';

const router = express.Router();

// Endpoint registro de usuarios
router.post('/users/registro', registerUserController);

router.get('/salas/:idSala', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Detalle de sala',
    });
});

export default router;
