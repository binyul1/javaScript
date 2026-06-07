"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
class UserController {
    async getAllUserList(req, res, next) {
        try {
            const userList = await UserModel_1.default.find({}, { password: 0, __v: 0, "image.destination": 0, "image.originalName": 0, "image.size": 0 });
            res.json({
                data: userList,
                message: "User list retrieved",
                meta: {
                    pagination: {}
                }
            });
        }
        catch (exceptation) {
            next(exceptation);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map