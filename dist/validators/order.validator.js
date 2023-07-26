"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidator = void 0;
const Joi = require("joi");
const orderItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().optional(),
});
const orderSchema = Joi.object({
    customerName: Joi.string().required(),
    contact: Joi.string().required(),
    address: Joi.string().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    orderItems: Joi.array().items(orderItemSchema).required(),
});
const orderValidator = (payload) => {
    return orderSchema.validate(payload, { abortEarly: false });
};
exports.orderValidator = orderValidator;
//# sourceMappingURL=order.validator.js.map