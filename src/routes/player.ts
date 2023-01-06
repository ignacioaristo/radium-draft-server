import express from 'express';

import { createPlayer, editPlayer, getPlayer, getPlayers } from 'src/controllers/player';
import { isFirebaseTokenValid, isPlayerAuthMiddleware } from 'src/middlewares/auth';
import { validatePlayerSchema } from 'src/middlewares/player';

const router = express.Router();

router.post('/', isFirebaseTokenValid, validatePlayerSchema, createPlayer);
router.get('/all', isPlayerAuthMiddleware, getPlayers);
router.get('/', isPlayerAuthMiddleware, getPlayer);
router.patch('/', isPlayerAuthMiddleware, validatePlayerSchema, editPlayer);

export default router;
