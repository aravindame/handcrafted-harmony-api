"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
(async () => await dotenv.config())();
exports.authenticated = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});
//# sourceMappingURL=authentication.handler.js.map