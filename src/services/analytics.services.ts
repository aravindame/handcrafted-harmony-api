import { Order } from '../models/orders.model';

/**
 * Represents the total quantity and price sum of an order item.
 */
export interface ITotalQuantity {
  id: string,
  totalQuantity: number;
  sumPrice: number;
  title: string;
  price: number;
  imageUrl: string;
}

/**
 * Retrieves the analytics data of total quantities and price sums for order items.
 * @returns A promise that resolves to an array of {@link ITotalQuantity} objects.
 * @throws If there is a failure in retrieving the analytics data.
 */
export async function getAnalytics(): Promise<ITotalQuantity[]> {
  try {
    const analytics = await Order.aggregate([
      {
        $unwind: '$orderItems',
      },
      {
        $group: {
          _id: '$orderItems.productId',
          totalQuantity: {
            $sum: '$orderItems.quantity',
          },
          sumPrice: {
            $sum: {
              $multiply: ['$orderItems.quantity', '$orderItems.price'],
            },
          },
          title: {
            $first: '$orderItems.title',
          },
          price: {
            $first: '$orderItems.price',
          },
          imageUrl: {
            $first: '$orderItems.imageUrl',
          },
        },
      },
    ]).exec();

    return analytics;
  } catch (error) {
    throw new Error('Failed to retrieve analytics');
  }
}
