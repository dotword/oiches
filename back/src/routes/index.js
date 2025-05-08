import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import gruposRouter from './gruposRouter.js';
import reservasRouter from './reservasRoutes.js';
import listasRouter from './listasRouter.js';
import votosRouter from './votosRouter.js';
import contactRoutes from './contactRoutes.js';
import conciertosRouter from './conciertosRouter.js';
import adminRouter from './adminRouter.js';
import agenciasRouter from './agenciasRouter.js';
import concursoRouter from './concursoRouter.js';

const router = express.Router();

router.use(usersRouter);
router.use(salasRouter);
router.use(gruposRouter);
router.use(listasRouter);
router.use(reservasRouter);
router.use(votosRouter);
router.use(contactRoutes);
router.use(conciertosRouter);
router.use(adminRouter);
router.use(agenciasRouter);
router.use(concursoRouter);

export default router;
