"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    if (error && error.message) {
        res.status(500).send(error.message);
    }
    else {
        next(error);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.handler.js.map