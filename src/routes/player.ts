import express from 'express';

import { createPlayer, getPlayers } from 'src/controllers/player';
import { isFirebaseTokenValid, isPlayerAuthMiddleware } from 'src/middlewares/auth';

const router = express.Router();

router.post('/', isFirebaseTokenValid, createPlayer);
router.get('/', isPlayerAuthMiddleware, getPlayers);

export default router;
