"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/products', products_controller_1.getProduct);
router.post('/products', [], products_controller_1.createProducts);
router.get('/products/:itemId', [], products_controller_1.getProductsById);
router.put('/products/:itemId', [], products_controller_1.updateProductsById);
router.delete('/products/:itemId', [], products_controller_1.deleteProducts);
exports.default = router;
//# sourceMappingURL=products.routes.js.map