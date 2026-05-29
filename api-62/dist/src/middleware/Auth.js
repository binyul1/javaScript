"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const AuthCheck = (role = null) => {
    return async (req, res, next) => {
        // jwt token
        // jwt token verify
        // Todo: check if user is logged in or not
        // next execute
        try {
            let token = req.headers.authorization || null;
            if (!token) {
                next({ code: 401, message: "Login required" });
            }
            else {
                //token is present
                //how jwt token is verified
                // verify token
                token = String(token).replace(/^Bearer\s+/i, "");
                //Token :verify
                const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                // const userDetail = await UserModel.findById(data.sub);
                const userDetail = await UserModel_1.default.findOne({ _id: data.sub });
                if (!userDetail) {
                    next({ code: 401, message: "User not found" });
                }
                else {
                    req.loggedInUser = {
                        image: userDetail.image
                            ? {
                                originalName: userDetail.image.originalName ?? null,
                                fileName: userDetail.image.fileName ?? null,
                                destination: userDetail.image.destination ?? null,
                                size: userDetail.image.size ?? null,
                            }
                            : null,
                        _id: userDetail._id,
                        firstName: userDetail.firstName,
                        email: userDetail.email,
                        lastName: userDetail.lastName,
                        username: userDetail.username,
                        maidenName: userDetail.maidenName,
                        phone: userDetail.phone,
                        role: userDetail.role,
                    };
                    if (!role ||
                        (role && role.includes(userDetail.role))
                        || userDetail.role === "admin") {
                        next();
                    }
                    else {
                        throw { code: 403, message: "Acess Denied" };
                    }
                }
            }
        }
        catch (exceptation) {
            if (exceptation instanceof jsonwebtoken_1.default.TokenExpiredError) {
                next({ code: 401, message: "Token expired" });
            }
            else if (exceptation instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                next({ code: 401, message: "JWT Error: " + exceptation.message });
            }
            else {
                next(exceptation);
            }
        }
    };
};
exports.default = AuthCheck;
//# sourceMappingURL=Auth.js.map