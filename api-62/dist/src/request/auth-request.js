"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty().nonoptional(),
    password: zod_1.z.string().nonempty().nonoptional(),
});
exports.UserRegisterSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(2).max(20).nonempty("First Name is required"),
    maidenName: zod_1.z.string().nullable(),
    lastName: zod_1.z.string().min(2).max(20).nonempty("Last Name is required"),
    email: zod_1.z.email().nonempty("Email is required"),
    username: zod_1.z.string().min(3).max(25).nonempty("Username is required"),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\\0-9])(?=.*[\W-_]).{8,25}$/, "Password does not follow strong password rule."),
    confirmPassword: zod_1.z.string().nonempty(),
    phone: zod_1.z.string().nullable(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=auth-request.js.map