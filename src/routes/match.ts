import express from 'express';

import {
  createMatch,
  getActiveMatches,
  getInactiveMatches,
  getMatches,
} from 'src/controllers/match';
import { isPlayerAuthMiddleware } from 'src/middlewares/auth';

const router = express.Router();

router.post('/', isPlayerAuthMiddleware, createMatch);
router.get('/', isPlayerAuthMiddleware, getMatches);
router.get('/inactive', isPlayerAuthMiddleware, getInactiveMatches);
router.get('/active', isPlayerAuthMiddleware, getActiveMatches);
router.patch('/cancel/:id', cancelMatch);
router.patch('/finish/:id', finishMatch);

export default router;
