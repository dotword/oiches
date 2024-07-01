import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import musicosRouter from './musicosRouter.js';
import salasSearchRouter from './salasSearchRouter.js';

const router = express.Router();

router.use(usersRouter);
router.use(salasRouter);
router.use(musicosRouter);
router.use('/search/salas', salasSearchRouter);

export default router;
