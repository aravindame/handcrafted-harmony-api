"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.role = (0, express_oauth2_jwt_bearer_1.claimIncludes)('admin');
//# sourceMappingURL=authorization.handler.js.map