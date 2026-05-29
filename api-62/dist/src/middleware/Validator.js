"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            if (!data) {
                next({ code: 422, message: "Data not set." });
                return;
            }
            else {
                // validate and transform incoming values into real numbers/strings
                req.body = await schema.parseAsync(data);
                next();
            }
        }
        catch (exception) {
            let errorBag = {};
            if (exception instanceof zod_1.default.ZodError) {
                exception.issues.map((error) => {
                    const key = error.path[0];
                    errorBag[key] = error.message;
                });
            }
            next({ detail: errorBag, code: 400, message: "Validation Failed" });
        }
    };
};
exports.bodyValidator = bodyValidator;
//# sourceMappingURL=Validator.js.map