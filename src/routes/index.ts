import express from 'express';

import match from './match';
import player from './player';

const router = express.Router();

router.use('/player', player);
router.use('/match', match);

export default router;
