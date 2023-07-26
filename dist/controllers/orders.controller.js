"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.createOrders = void 0;
const orders_services_1 = require("../services/orders.services");
const logger_util_1 = require("../util/logger.util");
async function createOrders(req, res) {
    try {
        const order = await (0, orders_services_1.createOrder)(req.body);
        res.status(201).send({ order });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error });
        logger_util_1.default.error(error);
    }
}
exports.createOrders = createOrders;
async function getOrder(req, res) {
    try {
        const orders = await (0, orders_services_1.getOrders)();
        res.status(200).send(orders);
    }
    catch (error) {
        res.status(500).send(error);
        logger_util_1.default.error(error);
    }
}
exports.getOrder = getOrder;
//# sourceMappingURL=orders.controller.js.map