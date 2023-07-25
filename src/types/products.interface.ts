import { Document } from 'mongoose'

export interface IProduct extends Document {
    title: string,
    description: string,
    availableQuantity: number,
    createdAt: string,
    isDeleted: boolean,
    category: string,
    updatedAt: string,
    imageUrl: string,
    price: number
}