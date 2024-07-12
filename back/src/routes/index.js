import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import gruposRouter from './gruposRouter.js';
import reservasRouter from './reservasRoutes.js';
import listasRouter from './listasRouter.js';
import createGrupoRouter from './createGrupoRouter.js';

const router = express.Router();

router.use(usersRouter);
router.use(salasRouter);
router.use(gruposRouter);
router.use(listasRouter);
router.use(reservasRouter);
router.use('/grupos', gruposRouter);
router.use('/grupos', createGrupoRouter);

export default router;
