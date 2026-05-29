"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (req, res, next) => {
    res.json({
        data: "Health ok",
        message: "Success",
        meta: null,
    });
};
exports.healthCheck = healthCheck;
exports.default = exports.healthCheck;
//# sourceMappingURL=TestController.js.map