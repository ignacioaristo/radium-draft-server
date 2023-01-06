import express from 'express';

import {
  cancelMatch,
  createMatch,
  finishMatch,
  getActiveMatches,
  getInactiveMatches,
  getMatch,
  getMatches,
} from 'src/controllers/match';
import { isPlayerAuthMiddleware } from 'src/middlewares/auth';

const router = express.Router();

router.post('/', isPlayerAuthMiddleware, createMatch);
router.get('/', isPlayerAuthMiddleware, getMatch);
router.get('/all', isPlayerAuthMiddleware, getMatches);
router.get('/inactive', isPlayerAuthMiddleware, getInactiveMatches);
router.get('/active', isPlayerAuthMiddleware, getActiveMatches);
router.patch('/cancel/:id', isPlayerAuthMiddleware, cancelMatch);
router.patch('/finish/:id', isPlayerAuthMiddleware, finishMatch);

export default router;
