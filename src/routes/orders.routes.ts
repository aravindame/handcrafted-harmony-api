import { Router } from 'express';
import { createOrders, getOrder } from '../controllers/orders.controller';

const router = Router();

router.get('/orders', getOrder);
router.post('/orders', createOrders);

export default router;