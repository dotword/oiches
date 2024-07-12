// src/routes/createGrupoRouter.js

import express from 'express';
import createGrupoController from '../controllers/grupos/createGrupoController.js';
import authUser from '../middleware/authUser.js';
import userExists from '../middleware/userExists.js';

const router = express.Router();

router.post('/create', authUser, userExists, createGrupoController);

export default router;
