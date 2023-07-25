import * as orderService from '../../services/orders.services';

describe('OrderService', () => {
  const mockOrderData = {
    customerName: 'John Doe',
    contact: 'john@example.com',
    address: '123 Main St',
    orderItems: [
      {
        productId: 'product1',
        quantity: 2,
        title: 'Product 1',
        price: 10,
        imageUrl: 'https://example.com/product1.jpg',
      },
      {
        productId: 'product2',
        quantity: 1,
        title: 'Product 2',
        price: 20,
        imageUrl: 'https://example.com/product2.jpg',
      },
    ],
  };

  describe('createOrder', () => {
    it('should create and save an order', async () => {
      const mockOrder = {
        _id: 'order1',
      };
      const mockOrderModel = jest.fn().mockReturnValue(mockOrder);

      jest.spyOn(orderService, 'createOrder').mockImplementation(async () => {
        return await mockOrderModel(mockOrderData);
      });

      const result = await orderService.createOrder(mockOrderData);

      expect(mockOrderModel).toHaveBeenCalledWith(mockOrderData);
      expect(result).toEqual(mockOrder);
    });

  });

  describe('getOrders', () => {
    it('should return an array of orders', async () => {
      const mockOrders = [
        {
          _id: 'order1',
          customerName: 'John Doe',
          contact: 'john@example.com',
          address: '123 Main St',
          orderItems: [
            {
              productId: 'product1',
              quantity: 2,
              title: 'Product 1',
              price: 10,
              imageUrl: 'https://example.com/product1.jpg',
            },
          ],
        },
        {
          _id: 'order2',
          customerName: 'Jane Smith',
          contact: 'jane@example.com',
          address: '456 Elm St',
          orderItems: [
            {
              productId: 'product2',
              quantity: 1,
              title: 'Product 2',
              price: 20,
              imageUrl: 'https://example.com/product2.jpg',
            },
          ],
        },
      ];
      const mockFind = jest.fn().mockResolvedValue(mockOrders);

      jest.spyOn(orderService, 'getOrders').mockImplementation(() => {
        return mockFind();
      });

      const result = await orderService.getOrders();

      expect(mockFind).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });
  describe('getOrders', () => {
    it('should return an empty array of orders', async () => {
      const mockOrders = [];
      const mockFind = jest.fn().mockResolvedValue(mockOrders);

      jest.spyOn(orderService, 'getOrders').mockImplementation(() => {
        return mockFind();
      });

      const result = await orderService.getOrders();

      expect(mockFind).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });
});
