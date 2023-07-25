import { Router } from 'express';
import { authenticated } from '../middleware/authentication.handler';
import { role } from '../middleware/authorization.handler';
import { createProducts, getProduct, getProductsById, updateProductsById, deleteProducts} from '../controllers/products.controller';

const router = Router();

router.get('/products', getProduct);
router.post('/products',[], createProducts);
router.get('/products/:itemId',[], getProductsById);
router.put('/products/:itemId',[], updateProductsById);
router.delete('/products/:itemId',[], deleteProducts);

export default router;