import { Document } from 'mongoose';
export interface IOrder extends Document {
    customerName: string;
    contact: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    orderItems: {
        productId: string;
        quantity: number;
        title: string;
        price: number;
        imageUrl?: string;
    }[];
}
