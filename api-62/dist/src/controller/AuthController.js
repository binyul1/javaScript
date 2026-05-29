"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_env_1 = require("../config/app-env");
class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
            try {
                // data
                const credentials = req.body;
                // .findById(id)
                // .find(filter)
                // .findOne(filter)
                const userDetail = await UserModel_1.default.findOne({
                    $or: [
                        { username: credentials.username },
                        { email: credentials.username },
                    ],
                });
                if (!userDetail) {
                    throw { code: 422, message: "User not found." };
                }
                // password verify
                if (!bcryptjs_1.default.compareSync(credentials.password, userDetail.password)) {
                    throw { code: 422, message: "Credentials does not match." };
                }
                const expiresInMinutes = Number(credentials.expiresInMinutes) || 180;
                const token = jsonwebtoken_1.default.sign({ sub: userDetail._id, typ: "Bearer" }, app_env_1.Secrets.jwtSecret, {
                    expiresIn: `${expiresInMinutes}m`,
                });
                res.json({
                    data: {
                        accessToken: token,
                    },
                    message: "Login success",
                    meta: null,
                });
            }
            catch (exception) {
                next(exception);
            }
        };
        this.getUserDetailById = async (req, res, next) => {
            // this function or route is only accessed by loggedin User =>
            try {
                const params = req.params;
                const userDetail = await UserModel_1.default.findById(params.userId, {
                    password: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                });
                if (!userDetail) {
                    throw { code: 404, message: "User not found" };
                }
                res.json({
                    data: userDetail,
                    message: "User Detail",
                    meta: null,
                });
            }
            catch (exceptation) {
                next(exceptation);
            }
        };
    }
    async register(req, res, next) {
        try {
            const data = AuthService_1.default.mapUserDataForRegister(req);
            const user = await AuthService_1.default.storeUser(data);
            res.json({
                data: user,
                message: "User Account registered successfully",
                meta: null,
            });
        }
        catch (exceptation) {
            next(exceptation);
        }
    }
    getLoggedInUserDetail(req, res, next) {
        const loggedInUser = req.loggedInUser;
        res.json({
            data: {
                ...req.loggedInUser,
                image: `${app_env_1.AppConfig.assetsUrl}uploads/users/${loggedInUser?.image?.fileName}`,
            },
            message: "User Detail",
            meta: null,
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map