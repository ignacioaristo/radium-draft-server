import express from 'express';

import auth from './auth';
import match from './match';
import player from './player';

const router = express.Router();

router.use('/player', player);
router.use('/match', match);
router.use('/auth', auth);

export default router;
