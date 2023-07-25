import * as productService from '../../services/product.services';

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

      const savedProduct: any = {
        _id: 'product-id',
        ...productData,
      };


      const productSaveSpy = jest.spyOn(productService, 'createProduct').mockResolvedValueOnce(savedProduct);

      const createdProduct = await productService.createProduct(productData as any);

      expect(productSaveSpy).toHaveBeenCalledTimes(1);
      expect(createdProduct).toEqual(savedProduct);
    });
  });

  describe('getProducts', () => {
    it('should return all active products', async () => {
      const expectedProducts: any[] = [
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

      const productSpy = jest.spyOn(productService, 'getProducts')?.mockResolvedValueOnce(expectedProducts as any);

      const products = await productService.getProducts();

      expect(productSpy).toHaveBeenCalledTimes(1);
      expect(products).toEqual(expectedProducts);
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const productId = 'product-id';
      const expectedProduct: any = {
        _id: productId,
        title: 'Product 1',
        description: 'Product 1 description',
        category: 'Product category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        isDeleted: false,
      };

      const productSpy = jest.spyOn(productService, 'getProductById')?.mockResolvedValueOnce(expectedProduct);

      const product = await productService.getProductById(productId);

      expect(product).toEqual(expectedProduct);
    });

    it('should return null if no product found with the given ID', async () => {
      const productId = 'non-existent-id';

      const productSpy = jest.spyOn(productService, 'getProductById')?.mockResolvedValueOnce(null);

      const product = await productService.getProductById(productId);

      expect(productSpy).toHaveBeenCalledWith(productId);
      expect(product).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID and set isDeleted to true', async () => {
      const productId = 'product-id';
      const expectedProduct: any = {
        _id: productId,
        title: 'Product 1',
        description: 'Product 1 description',
        category: 'Product category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        isDeleted: false,
      };

      const productSpy = jest.spyOn(productService, 'deleteProduct')?.mockResolvedValueOnce(expectedProduct);

      const deletedProduct = await productService.deleteProduct(productId);

      expect(productSpy).toHaveBeenCalledWith(productId);
      expect(deletedProduct).toEqual(expectedProduct);
    });

    it('should return null if no product found with the given ID', async () => {
      const productId = 'non-existent-id';

      const productSpy = jest.spyOn(productService, 'deleteProduct')?.mockResolvedValueOnce(null);

      const deletedProduct = await productService.deleteProduct(productId);

      expect(productSpy).toHaveBeenCalledWith(productId);
      expect(deletedProduct).toBeNull();
    });

  });

  describe('updateProductById', () => {
    it('should update a product by ID', async () => {
      const productId = 'product-id';
      const updateData = {
        title: 'Updated Product',
        description: 'Updated description',
        price: 15,
      };

      const expectedProduct: any = { "description": "Updated description", "price": 15, "title": "Updated Product" };

      const productSpy = jest.spyOn(productService, 'updateProductById')?.mockResolvedValueOnce(expectedProduct);
      const updatedProduct = await productService.updateProductById(productId, updateData);
      expect(updatedProduct).toEqual({
        ...expectedProduct,
        ...updateData,
      });
    });
  });
});
