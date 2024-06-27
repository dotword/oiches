import express from 'express';

import usersRouter from './usersRouter.js';
import salasRouter from './salasRouter.js';
import musicosRouter from './musicosRouter.js';

const router = express.Router();

router.use(usersRouter);
router.use(salasRouter);
router.use(musicosRouter);

export default router;
