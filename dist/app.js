"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const error_handler_1 = require("./middleware/error.handler");
const logger_util_1 = require("./util/logger.util");
const orders_routes_1 = require("./routes/orders.routes");
const config_util_1 = require("./util/config.util");
const products_routes_1 = require("./routes/products.routes");
const analytics_routes_1 = require("./routes/analytics.routes");
const app = express();
let config = null;
function applyRoutes() {
    logger_util_1.default === null || logger_util_1.default === void 0 ? void 0 : logger_util_1.default.info(`Applying application routes`);
    app.use(config['api-prefix'], orders_routes_1.default);
    app.use(config['api-prefix'], products_routes_1.default);
    app.use(config['api-prefix'], analytics_routes_1.default);
}
async function applyMiddleware() {
    logger_util_1.default === null || logger_util_1.default === void 0 ? void 0 : logger_util_1.default.info(`Applying application middleware`);
    config = await (0, config_util_1.getConfig)();
    app.use(express.json());
    app.use((0, helmet_1.default)());
    app.use(error_handler_1.errorHandler);
    app.use(cors(config === null || config === void 0 ? void 0 : config.cors));
    app.use((0, express_rate_limit_1.default)(config === null || config === void 0 ? void 0 : config.rateLimit));
}
(async () => {
    await applyMiddleware();
    applyRoutes();
})();
exports.default = app;
//# sourceMappingURL=app.js.map