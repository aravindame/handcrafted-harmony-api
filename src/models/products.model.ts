import { Schema, model } from 'mongoose'
import { IProduct } from 'src/types/products.interface'

/**

    Represents a Product document in the database.
    @interface IProduct
    @extends {import("mongoose").Document}
    @property {string} title - The title of the product.
    @property {string} description - The description of the product.
    @property {string} category - The category of the product.
    @property {string} createdAt - The creation date of the product.
    @property {string} updatedAt - The last update date of the product.
    @property {number} price - The price of the product.
    @property {string} imageUrl - The URL of the product image.
    @property {number} availableQuantity - The available quantity of the product.
    @property {boolean} status - The status of the product (true if active, false if inactive).
    @author Aravinda Meewalaarachchi
*/

const ProductSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true },
        description: { type: String },
        availableQuantity: { type: Number, required: true },
        createdAt: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        category: { type: String },
        updatedAt: { type: String, required: true },
        imageUrl: { type: String },
        price: { type: Number, required: true },
    },
    {
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

export const Product = model<IProduct>('Product', ProductSchema)
