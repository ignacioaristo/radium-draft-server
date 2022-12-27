import express from 'express';

import { createPlayer, getPlayers } from 'src/controllers/player';

const router = express.Router();

router.post('/', createPlayer);
router.get('/', getPlayers);

export default router;
