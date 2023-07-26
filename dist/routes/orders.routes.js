"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const router = (0, express_1.Router)();
router.get('/orders', orders_controller_1.getOrder);
router.post('/orders', orders_controller_1.createOrders);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map