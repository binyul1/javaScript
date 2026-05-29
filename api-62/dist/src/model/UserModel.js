"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// _id, -v, createdAt, updatedAt
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    maidenName: {
        type: String,
        required: false,
        default: null,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    // birthdate:{
    //     type: Date,
    // //  optional
    //   //  required: false,
    //   // default: null,
    // },
    birthDate: Date,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        originalName: String,
        fileName: String,
        size: Number,
        destination: String
    },
    address: {
        address: String,
        city: String,
        state: String,
        stateCode: String,
        postalCode: String,
        coordinates: {
            lat: mongoose_1.default.Types.Double,
            lng: mongoose_1.default.Types.Double,
        },
        country: String,
    },
    role: {
        type: String,
        enum: ["admin", "user", "viewer"],
        default: "user",
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true, // createdAt, updatedAt
});
// .model("modelName") => modelNames
// .model("User") => table(Collection) => users
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map