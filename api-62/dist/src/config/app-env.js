"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = exports.Secrets = exports.MongodbConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB_NAME,
};
exports.Secrets = {
    jwtSecret: process.env.JWT_SECRET
};
exports.AppConfig = {
    assetsUrl: process.env.ASSETS_URL
};
//# sourceMappingURL=app-env.js.map