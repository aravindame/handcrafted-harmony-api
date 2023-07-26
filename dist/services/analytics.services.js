"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const orders_model_1 = require("../models/orders.model");
async function getAnalytics() {
    try {
        const analytics = await orders_model_1.Order.aggregate([
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
    }
    catch (error) {
        throw new Error('Failed to retrieve analytics');
    }
}
exports.getAnalytics = getAnalytics;
//# sourceMappingURL=analytics.services.js.map