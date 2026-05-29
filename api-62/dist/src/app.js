"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const ErrorHandling_1 = require("./middleware/ErrorHandling");
require("./config/mongodb"); //database connection
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
//express application
const app = (0, express_1.default)(); //server-side application
// security middlewares
// CORS (Cross-Origin Resource Site)
// a.com => b.com (destination -> CORS allow)
app.use((0, cors_1.default)(
//origin: "localhost:5137", // allow only this origin
));
// security
//helmet
app.use((0, helmet_1.default)({
    xXssProtection: true, //scripting attack prevent
}));
//express-rate-limit
const limiter = (0, express_rate_limit_1.default)({
    limit: 150,
    windowMs: 30000,
});
app.use(limiter);
//built in middlewares
// parsers
// raw format
app.use(express_1.default.json({
    limit: "3mb",
})); //json parsing
//x-www-form-urlencoded format
app.use(express_1.default.urlencoded({
    limit: "3mb",
}));
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, "../public/")));
// loading the router
// app.use(cors(),router);// can write in this way also
app.use(router_1.default);
//404
app.use((req, res, next) => {
    next({
        code: 404,
        message: "Route Not Found",
    });
});
// error handling middlewares
app.use(ErrorHandling_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map