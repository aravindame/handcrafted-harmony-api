import { Document, Schema, model } from 'mongoose';
import { IOrder } from 'src/types/orders.interface';

/**
  Represents an order document in the database.
  @interface IOrder
  @extends Document
  @property {string} customerName - The name of the customer.
  @property {string} contact - The contact information of the customer.
  @property {string} address - The address of the customer.
  @property {string} createdAt - The timestamp when the order was created.
  @property {string} updatedAt - The timestamp when the order was last updated.
  @property {Array} orderItems - The items included in the order.
  @property {string} orderItems.productId - The ID of the product.
  @property {number} orderItems.quantity - The quantity of the product.
  @property {string} orderItems.title - The title of the product.
  @property {number} orderItems.price - The price of the product.
  @property {string} [orderItems.imageUrl] - The URL of the product's image (optional).
  @author Aravinda Meewalaarachchi
*/

const orderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  orderItems: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String },
    },
  ],
}, {
  versionKey: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

export const Order = model<IOrder>('Order', orderSchema)
