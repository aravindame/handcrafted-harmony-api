"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
const Joi = require("joi");
const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    availableQuantity: Joi.number().required(),
    createdAt: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    category: Joi.string().optional(),
    updatedAt: Joi.string().required(),
    imageUrl: Joi.string().optional(),
    price: Joi.number().required(),
});
const productValidator = (payload) => {
    return productSchema.validate(payload, { abortEarly: false });
};
exports.productValidator = productValidator;
//# sourceMappingURL=product.validator.js.map