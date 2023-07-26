import { Router } from 'express';
import { authenticated } from '../middleware/authentication.handler';
import { getAnalytic } from '../controllers/analytics.controller';

const router = Router();

router.get('/analytics',[authenticated], getAnalytic);

export default router;