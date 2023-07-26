"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductsById = exports.deleteProducts = exports.getProductsById = exports.getProduct = exports.createProducts = void 0;
const product_services_1 = require("../services/product.services");
const logger_util_1 = require("../util/logger.util");
async function createProducts(req, res) {
    try {
        const product = await (0, product_services_1.createProduct)(req.body);
        res.status(201).send(product);
        logger_util_1.default.info('Product created successfully');
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(400).send(error);
    }
}
exports.createProducts = createProducts;
async function getProduct(req, res) {
    try {
        const products = await (0, product_services_1.getProducts)();
        res.status(200).send(products);
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(500).send(error);
    }
}
exports.getProduct = getProduct;
async function getProductsById(req, res) {
    try {
        const { itemId } = req.params;
        const product = await (0, product_services_1.getProductById)(itemId);
        if (!product) {
            res.status(404).send('Product not found');
        }
        else {
            res.status(200).send(product);
            logger_util_1.default.info('Retrieved product by ID');
        }
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(500).send(error);
    }
}
exports.getProductsById = getProductsById;
async function deleteProducts(req, res) {
    try {
        const { itemId } = req.params;
        const product = await (0, product_services_1.deleteProduct)(itemId);
        if (!product) {
            res.status(404).send(`Product with itemID = ${itemId} not found`);
        }
        res.status(204).send({});
        logger_util_1.default.info(`Product with itemID = ${itemId} deleted successfully`);
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(500).send(error);
    }
}
exports.deleteProducts = deleteProducts;
async function updateProductsById(req, res) {
    try {
        const { itemId } = req.params;
        const product = await (0, product_services_1.updateProductById)(itemId, req.body);
        if (!product) {
            res.status(404).json({ message: `Product with itemID = ${itemId} not found` });
        }
        else {
            res.status(200).json(product);
            logger_util_1.default.info({ message: `Product with itemID = ${itemId} updated successfully` });
        }
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(500).send(error);
    }
}
exports.updateProductsById = updateProductsById;
//# sourceMappingURL=products.controller.js.map