import { Product } from '../models/products.model';
import { Order } from '../models/orders.model';
import { IProduct } from 'src/types/products.interface';
import { IOrder, OrderItem } from 'src/types/orders.interface';
import { orderValidator } from '../validators/order.validator';

/**
 * Get all orders.
 * @returns {Promise<IOrder[]>} A promise that resolves to an array of orders.
 */
export async function getOrders(): Promise<IOrder[]> {
    return Order.find()
}

/**
 * Creates an order based on the provided order data.
 * @param orderData The data for creating the order.
 * @returns The created order.
 * @throws If there are insufficient quantities for any item or if there's an error during the order creation process.
 */
export async function createOrder(orderData: any): Promise<IOrder> {
    try {
        const result = orderValidator(orderData);
        if(result?.error){
          throw result?.error;
        }
        const insufficientItems: OrderItem[] = await checkItemQuantities(orderData.orderItems);

        if (insufficientItems.length > 0) {
            throw new Error("Insufficient quantities for item/s");
        }
        await updateProductQuantity(orderData.orderItems);
        const order = new Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}

/**
 * Checks the quantities of items in the order.
 * @param itemOrders The array of order items to check.
 * @returns An array of order items with insufficient quantities.
 * @throws If there's an error during the quantity checking process.
 */
export async function checkItemQuantities(itemOrders: OrderItem[]): Promise<OrderItem[]> {
    try {
        const insufficientItems: OrderItem[] = [];

        for (const itemOrder of itemOrders) {
            const { productId, quantity } = itemOrder;
            const item: IProduct | null = await Product.findById(productId);

            if (item && item.availableQuantity < quantity) {
                insufficientItems.push(itemOrder);
            }
        }
        return insufficientItems;
    } catch (error) {
        throw new Error('Failed to check item quantities');
    }
}

/**
 * Updates the quantity of products based on the items in the order.
 * @param itemOrders The array of order items to update the quantities.
 * @throws If there's an error during the quantity updating process.
 */
async function updateProductQuantity(itemOrders: OrderItem[]): Promise<void> {
    try {
        for (const itemOrder of itemOrders) {
            const { productId } = itemOrder;
            const item = await Product.findById(productId);

            if (item) {
                item.availableQuantity -= itemOrder.quantity;
                await item.save();
            }
        }

    } catch (error) {
        throw new Error('Failed to update item quantities');
    }
}