import express from 'express';

import { createMatch, getActiveMatchs, getInactiveMatchs } from 'src/controllers/match';

const router = express.Router();

router.post('/', createMatch);
router.get('/inactive', getInactiveMatchs);
router.get('/active', getActiveMatchs);

export default router;
