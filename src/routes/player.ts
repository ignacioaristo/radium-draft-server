import express from 'express';

import { createPlayer, getPlayers } from 'src/controllers/player';
import { isFirebaseTokenValid, isPlayerAuthMiddleware } from 'src/middlewares/auth';
import { validatePlayerSchema } from 'src/middlewares/player';

const router = express.Router();

router.post('/', isFirebaseTokenValid, validatePlayerSchema, createPlayer);
router.get('/', isPlayerAuthMiddleware, getPlayers);

export default router;
