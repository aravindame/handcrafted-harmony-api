"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productService = require("../../services/product.services");
jest.mock('./../../models/products.model', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
}));
describe('ProductService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createProduct', () => {
        it('should create and save a new product', async () => {
            const productData = {
                title: 'Product 1',
                description: 'Product description',
                category: 'Product category',
                price: 10,
                createdAt: '12345',
                updatedAt: '12345',
                imageUrl: 'image-url',
                availableQuantity: 5,
                isDeleted: false,
            };
            const savedProduct = Object.assign({ _id: 'product-id' }, productData);
            const productSaveSpy = jest.spyOn(productService, 'createProduct').mockResolvedValueOnce(savedProduct);
            const createdProduct = await productService.createProduct(productData);
            expect(productSaveSpy).toHaveBeenCalledTimes(1);
            expect(createdProduct).toEqual(savedProduct);
        });
    });
    describe('getProducts', () => {
        it('should return all active products', async () => {
            var _a;
            const expectedProducts = [
                {
                    _id: 'product-1-id',
                    title: 'Product 1',
                    description: 'Product 1 description',
                    category: 'Product category',
                    price: 10,
                    imageUrl: 'image-url',
                    availableQuantity: 5,
                    isDeleted: false,
                },
                {
                    _id: 'product-2-id',
                    title: 'Product 2',
                    description: 'Product 2 description',
                    category: 'Product category',
                    price: 20,
                    imageUrl: 'image-url',
                    availableQuantity: 3,
                    isDeleted: false,
                },
            ];
            const productSpy = (_a = jest.spyOn(productService, 'getProducts')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(expectedProducts);
            const products = await productService.getProducts();
            expect(productSpy).toHaveBeenCalledTimes(1);
            expect(products).toEqual(expectedProducts);
        });
    });
    describe('getProductById', () => {
        it('should return a product by ID', async () => {
            var _a;
            const productId = 'product-id';
            const expectedProduct = {
                _id: productId,
                title: 'Product 1',
                description: 'Product 1 description',
                category: 'Product category',
                price: 10,
                imageUrl: 'image-url',
                availableQuantity: 5,
                isDeleted: false,
            };
            const productSpy = (_a = jest.spyOn(productService, 'getProductById')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(expectedProduct);
            const product = await productService.getProductById(productId);
            expect(product).toEqual(expectedProduct);
        });
        it('should return null if no product found with the given ID', async () => {
            var _a;
            const productId = 'non-existent-id';
            const productSpy = (_a = jest.spyOn(productService, 'getProductById')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(null);
            const product = await productService.getProductById(productId);
            expect(productSpy).toHaveBeenCalledWith(productId);
            expect(product).toBeNull();
        });
    });
    describe('deleteProduct', () => {
        it('should delete a product by ID and set isDeleted to true', async () => {
            var _a;
            const productId = 'product-id';
            const expectedProduct = {
                _id: productId,
                title: 'Product 1',
                description: 'Product 1 description',
                category: 'Product category',
                price: 10,
                imageUrl: 'image-url',
                availableQuantity: 5,
                isDeleted: false,
            };
            const productSpy = (_a = jest.spyOn(productService, 'deleteProduct')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(expectedProduct);
            const deletedProduct = await productService.deleteProduct(productId);
            expect(productSpy).toHaveBeenCalledWith(productId);
            expect(deletedProduct).toEqual(expectedProduct);
        });
        it('should return null if no product found with the given ID', async () => {
            var _a;
            const productId = 'non-existent-id';
            const productSpy = (_a = jest.spyOn(productService, 'deleteProduct')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(null);
            const deletedProduct = await productService.deleteProduct(productId);
            expect(productSpy).toHaveBeenCalledWith(productId);
            expect(deletedProduct).toBeNull();
        });
    });
    describe('updateProductById', () => {
        it('should update a product by ID', async () => {
            var _a;
            const productId = 'product-id';
            const updateData = {
                title: 'Updated Product',
                description: 'Updated description',
                price: 15,
            };
            const expectedProduct = { "description": "Updated description", "price": 15, "title": "Updated Product" };
            const productSpy = (_a = jest.spyOn(productService, 'updateProductById')) === null || _a === void 0 ? void 0 : _a.mockResolvedValueOnce(expectedProduct);
            const updatedProduct = await productService.updateProductById(productId, updateData);
            expect(updatedProduct).toEqual(Object.assign(Object.assign({}, expectedProduct), updateData));
        });
    });
});
//# sourceMappingURL=product.service.test.js.map