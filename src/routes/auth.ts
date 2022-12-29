import express from 'express';

import { createAccount } from 'src/controllers/auth';

const router = express.Router();

router.post('/register', createAccount);

export default router;
