import {
  cancelMatch,
  createMatch,
  finishMatch,
  getActiveMatches,
  getInactiveMatches,
  getMatch,
  getMatches,
  reDraft,
  updateMatch,
} from 'controllers/match';
import express from 'express';
import { isPlayerAuthMiddleware } from 'middlewares/auth';

const router = express.Router();

router.post('/', isPlayerAuthMiddleware, createMatch);
router.get('/', isPlayerAuthMiddleware, getMatch);
router.get('/all', isPlayerAuthMiddleware, getMatches);
router.get('/inactive', isPlayerAuthMiddleware, getInactiveMatches);
router.get('/active', isPlayerAuthMiddleware, getActiveMatches);
router.patch('/cancel/:id', isPlayerAuthMiddleware, cancelMatch);
router.patch('/finish/:id', isPlayerAuthMiddleware, finishMatch);
router.put('/:id/draft', isPlayerAuthMiddleware, reDraft);
router.put('/:id', isPlayerAuthMiddleware, updateMatch);

export default router;
