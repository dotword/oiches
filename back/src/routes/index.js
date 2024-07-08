import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import musicosRouter from './musicosRouter.js';
import reservasRouter from './reservasRoutes.js';
import listasRouter from './listasRouter.js';

const router = express.Router();

router.use(usersRouter);
router.use(salasRouter);
router.use(musicosRouter);
router.use(listasRouter);
router.use(reservasRouter);

export default router;
