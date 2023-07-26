"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytic = void 0;
const logger_util_1 = require("../util/logger.util");
const analytics_services_1 = require("../services/analytics.services");
async function getAnalytic(req, res) {
    try {
        const analytics = await (0, analytics_services_1.getAnalytics)();
        res.status(200).json(analytics);
    }
    catch (error) {
        logger_util_1.default.error(error);
        res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
}
exports.getAnalytic = getAnalytic;
//# sourceMappingURL=analytics.controller.js.map