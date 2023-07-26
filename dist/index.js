"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = require("./util/logger.util");
const dotenv = require("dotenv");
const app_1 = require("./app");
let server = null;
(async () => {
    await extractEnvConfigurations();
    initUncaughtExceptionHandler();
    await dbConnection();
    await startServer();
})();
async function extractEnvConfigurations() {
    const { error } = await dotenv.config();
    if (error) {
        throw new Error("An error occurred while extracting environment variables from .env file.");
    }
}
function initUncaughtExceptionHandler() {
    process.on('uncaughtException', (ex) => logger_util_1.default === null || logger_util_1.default === void 0 ? void 0 : logger_util_1.default.error(ex.message, ex));
    process.on('unhandledRejection', (ex) => logger_util_1.default === null || logger_util_1.default === void 0 ? void 0 : logger_util_1.default.error(ex.message, ex));
}
async function dbConnection() {
    try {
        const { connect } = await Promise.resolve().then(() => require('./database/db.mongo'));
        await connect();
    }
    catch (error) {
        process.exit(1);
    }
}
async function startServer() {
    const port = process.env.PORT || 3001;
    server = await app_1.default.listen(port, () => console.info(`Listening on port ${port}`));
    server.on('error', (error) => {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    });
}
function getServer() {
    return server;
}
exports.default = getServer;
//# sourceMappingURL=index.js.map