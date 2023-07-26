import { Router } from 'express';
import { authenticated } from '../middleware/authentication.handler';
import { createProducts, getProduct, getProductsById, updateProductsById, deleteProducts} from '../controllers/products.controller';

const router = Router();

router.get('/products', getProduct);
router.post('/products',[authenticated], createProducts);
router.get('/products/:itemId',[authenticated], getProductsById);
router.put('/products/:itemId',[authenticated], updateProductsById);
router.delete('/products/:itemId',[authenticated], deleteProducts);

export default router;