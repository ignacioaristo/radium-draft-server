import express from 'express';

import { createAccount, login } from 'src/controllers/auth';

const router = express.Router();

router.post('/login', login);
router.post('/', createAccount);

export default router;
