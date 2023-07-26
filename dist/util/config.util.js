"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
async function getConfig() {
    var _a;
    try {
        const envConfig = await (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "production"
            ? Promise.resolve().then(() => require("../config/prod.config.json")) : Promise.resolve().then(() => require("../config/dev.config.json")));
        return envConfig;
    }
    catch (error) {
        throw new Error("Failed to retrieve configuration.");
    }
}
exports.getConfig = getConfig;
//# sourceMappingURL=config.util.js.map