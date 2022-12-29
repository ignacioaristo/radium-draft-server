import express from 'express';

import auth from './auth';
import match from './match';
import player from './player';

const router = express.Router();

router.use('/auth', auth);
router.use('/player', player);
router.use('/match', match);

export default router;
