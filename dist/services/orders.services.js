"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkItemQuantities = exports.createOrder = exports.getOrders = void 0;
const products_model_1 = require("../models/products.model");
const orders_model_1 = require("../models/orders.model");
const order_validator_1 = require("../validators/order.validator");
async function getOrders() {
    return orders_model_1.Order.find();
}
exports.getOrders = getOrders;
async function createOrder(orderData) {
    try {
        const result = (0, order_validator_1.orderValidator)(orderData);
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw result === null || result === void 0 ? void 0 : result.error;
        }
        const insufficientItems = await checkItemQuantities(orderData.orderItems);
        if (insufficientItems.length > 0) {
            throw new Error("Insufficient quantities for item/s");
        }
        await updateProductQuantity(orderData.orderItems);
        const order = new orders_model_1.Order(orderData);
        await order.save();
        return order;
    }
    catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}
exports.createOrder = createOrder;
async function checkItemQuantities(itemOrders) {
    try {
        const insufficientItems = [];
        for (const itemOrder of itemOrders) {
            const { productId, quantity } = itemOrder;
            const item = await products_model_1.Product.findById(productId);
            if (item && item.availableQuantity < quantity) {
                insufficientItems.push(itemOrder);
            }
        }
        return insufficientItems;
    }
    catch (error) {
        throw new Error('Failed to check item quantities');
    }
}
exports.checkItemQuantities = checkItemQuantities;
async function updateProductQuantity(itemOrders) {
    try {
        for (const itemOrder of itemOrders) {
            const { productId } = itemOrder;
            const item = await products_model_1.Product.findById(productId);
            if (item) {
                item.availableQuantity -= itemOrder.quantity;
                await item.save();
            }
        }
    }
    catch (error) {
        throw new Error('Failed to update item quantities');
    }
}
//# sourceMappingURL=orders.services.js.map