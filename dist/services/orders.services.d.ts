import { IOrder } from 'src/types/orders.interface';
type OrderItem = {
    productId: string;
    quantity: number;
    title: string;
    price: number;
    imageUrl: string;
};
export declare function getOrders(): Promise<IOrder[]>;
export declare function createOrder(orderData: any): Promise<IOrder>;
export declare function checkItemQuantities(itemOrders: OrderItem[]): Promise<OrderItem[]>;
export {};
