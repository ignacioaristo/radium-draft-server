import express from 'express';

import { createMatch, getMatchs } from 'src/controllers/match';

const router = express.Router();

router.post('/', createMatch);
router.get('/', getMatchs);

export default router;
