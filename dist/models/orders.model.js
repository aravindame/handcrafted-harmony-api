"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customerName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    orderItems: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
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
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=orders.model.js.map