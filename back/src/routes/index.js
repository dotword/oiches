import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import gruposRouter from './gruposRouter.js';
import reservasRouter from './reservasRoutes.js';
import listasRouter from './listasRouter.js';
import votosRouter from './votosRouter.js';
import conversacionesRouter from './conversacionesRouter.js';
const router = express.Router();
router.use(conversacionesRouter);
router.use(usersRouter);
router.use(salasRouter);
router.use(gruposRouter);
router.use(listasRouter);
router.use(reservasRouter);
router.use(votosRouter);

export default router;
