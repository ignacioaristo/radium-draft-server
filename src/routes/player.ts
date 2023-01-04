import express from 'express';

import { createPlayer, getPlayer, getPlayers } from 'src/controllers/player';
import { isFirebaseTokenValid, isPlayerAuthMiddleware } from 'src/middlewares/auth';
import { validatePlayerSchema } from 'src/middlewares/player';

const router = express.Router();

router.post('/', isFirebaseTokenValid, validatePlayerSchema, createPlayer);
router.get('/', isPlayerAuthMiddleware, getPlayer);
router.get('/all', isPlayerAuthMiddleware, getPlayers);

export default router;
