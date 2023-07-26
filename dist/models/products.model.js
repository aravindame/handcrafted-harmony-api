"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    availableQuantity: { type: Number, required: true },
    createdAt: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    category: { type: String },
    updatedAt: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
}, {
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=products.model.js.map