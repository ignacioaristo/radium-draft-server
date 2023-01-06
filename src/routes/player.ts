import { createPlayer, editPlayer, getPlayer, getPlayers } from 'controllers/player';
import express from 'express';
import { isFirebaseTokenValid, isPlayerAuthMiddleware } from 'middlewares/auth';
import { validatePlayerSchema } from 'middlewares/player';

const router = express.Router();

router.post('/', isFirebaseTokenValid, validatePlayerSchema, createPlayer);
router.get('/all', isPlayerAuthMiddleware, getPlayers);
router.get('/', isPlayerAuthMiddleware, getPlayer);
router.patch('/', isPlayerAuthMiddleware, validatePlayerSchema, editPlayer);

export default router;
