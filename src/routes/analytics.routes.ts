import { Router } from 'express';
import { authenticated } from '../middleware/authentication.handler';
import { role } from '../middleware/authorization.handler';
import { getAnalytic } from '../controllers/analytics.controller';

const router = Router();

router.get('/analytics',[], getAnalytic);

export default router;