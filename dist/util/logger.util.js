"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const config_util_1 = require("./config.util");
const { combine, timestamp, label, prettyPrint } = winston_1.format;
let loggerInstance = null;
function getLoggerInstance() {
    if (!loggerInstance) {
        throw new Error("Logger has not been initialized.");
    }
    return loggerInstance;
}
(async () => {
    await initLogger();
    getLoggerInstance();
})();
async function initLogger() {
    var _a, _b, _c, _d, _e;
    const envConfig = await (0, config_util_1.getConfig)();
    loggerInstance = (0, winston_1.createLogger)({
        level: (_a = envConfig === null || envConfig === void 0 ? void 0 : envConfig.logger) === null || _a === void 0 ? void 0 : _a.level,
        format: combine(label({ label: (_b = envConfig === null || envConfig === void 0 ? void 0 : envConfig.logger) === null || _b === void 0 ? void 0 : _b.label }), timestamp({ format: (_c = envConfig === null || envConfig === void 0 ? void 0 : envConfig.logger) === null || _c === void 0 ? void 0 : _c.timestamp.format }), prettyPrint()),
        transports: [
            new winston_1.transports.File((_d = envConfig === null || envConfig === void 0 ? void 0 : envConfig.logger) === null || _d === void 0 ? void 0 : _d.levelInfo),
            new winston_1.transports.File((_e = envConfig === null || envConfig === void 0 ? void 0 : envConfig.logger) === null || _e === void 0 ? void 0 : _e.levelError),
            new winston_1.transports.Console(),
        ],
    });
}
exports.default = loggerInstance;
//# sourceMappingURL=logger.util.js.map