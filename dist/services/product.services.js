"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductById = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const products_model_1 = require("../models/products.model");
const product_validator_1 = require("../validators/product.validator");
const console_1 = require("console");
async function getProducts() {
    try {
        const products = await products_model_1.Product.find({ isDeleted: false });
        return products;
    }
    catch (error) {
        throw error;
    }
}
exports.getProducts = getProducts;
async function createProduct(productData) {
    try {
        const result = (0, product_validator_1.productValidator)(productData);
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw console_1.error;
        }
        const createdProduct = await products_model_1.Product.create(productData);
        return createdProduct;
    }
    catch (error) {
        throw new Error('Failed to create product.');
    }
}
exports.createProduct = createProduct;
async function getProductById(itemId) {
    try {
        const product = await products_model_1.Product.findById(itemId);
        return product;
    }
    catch (error) {
        throw error;
    }
}
exports.getProductById = getProductById;
async function updateProductById(itemId, updateData) {
    try {
        const result = (0, product_validator_1.productValidator)(updateData);
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw result === null || result === void 0 ? void 0 : result.error;
        }
        const product = await products_model_1.Product.findByIdAndUpdate(itemId, updateData, {
            new: true,
        });
        return product;
    }
    catch (error) {
        throw error;
    }
}
exports.updateProductById = updateProductById;
async function deleteProduct(itemId) {
    try {
        const product = await products_model_1.Product.findById(itemId);
        if (!product) {
            return;
        }
        product.isDeleted = true;
        await product.save();
        return product;
    }
    catch (error) {
        throw error;
    }
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.services.js.map