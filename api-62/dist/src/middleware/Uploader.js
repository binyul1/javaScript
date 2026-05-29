"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const uploader = (dir = "/") => {
    const myStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            // const filePath = path.join(__dirname, "../../public/uploads", dir);
            const filePath = "./public/uploads" + dir;
            if (!fs_1.default.existsSync(filePath)) {
                fs_1.default.mkdirSync(filePath, { recursive: true });
            }
            cb(null, filePath);
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        },
    });
    // const imageFilter = (req, file, cb) => {
    //   const ext = file.originalname.split(".").pop();
    //   const allowed = ["jpg", "jpeg", "png", "gif"];
    //   if (allowed.includes(ext)) {
    //     cb(null, true);
    //   } else {
    //     cb({ code: 422, message: "file format not allowed!" });
    //   }
    // }
    const multerobj = (0, multer_1.default)({
        // dest: "/path for your file",
        // storage: "configure your storage",
        storage: myStorage,
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split(".").pop();
            const allowed = ["jpg", "jpeg", "png", "gif"];
            if (allowed.includes(ext.toLowerCase())) {
                cb(null, true);
            }
            else {
                cb(new Error("file format not allowed!"));
            }
        },
        limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    });
    return multerobj;
};
exports.default = uploader;
//# sourceMappingURL=Uploader.js.map