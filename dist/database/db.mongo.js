"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = require("mongoose");
const DB_USERNAME = process.env.DB_USERNAME, DB_PWD = process.env.DB_PWD;
if (!DB_USERNAME || !DB_PWD) {
    throw new Error('Please define the DB_USERNAME and DB_PWD environment variable inside .env');
}
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PWD}@cluster0.jwrama9.mongodb.net/misisipi`;
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };
        mongoose_1.default.set('strictQuery', false);
        cached.promise = mongoose_1.default
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
            console.info('Successfully connected to MongoDB instance.....');
            return mongoose;
        })
            .catch((error) => {
            console === null || console === void 0 ? void 0 : console.error('Failed to connect to MongoDB:', error);
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
exports.connect = connect;
//# sourceMappingURL=db.mongo.js.map