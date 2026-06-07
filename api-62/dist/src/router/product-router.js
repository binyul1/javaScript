"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controller/ProductController"));
const Uploader_1 = __importDefault(require("../middleware/Uploader"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const Validator_1 = require("../middleware/Validator");
const product_request_1 = require("../request/product-request");
const productRouter = (0, express_1.Router)();
const productCtrl = new ProductController_1.default();
// .none() => if content-type is multipart/form-data but no file upload
// .single(nameOfFileUploadingField) => if content-type if multipart/form-data and a field has a single file upload
// .array(nameOfFileUploadingField, maxCount) 
// .fields([{name: FieldName, maxCount: number}])
productRouter.get("/categories", productCtrl.getAllCategories);
productRouter.get("/categories/:slug", productCtrl.getAllProductByCatSlug);
//localhost:9005/products/home
productRouter.get("/home", productCtrl.getAllProducts);
productRouter.get("/:productSlug/home", productCtrl.homeGetProductDetailBySlug);
productRouter.post("/", (0, Auth_1.default)(["admin"]), 
// uploader().single("thumbnail"),
// uploader().array("images"),
(0, Uploader_1.default)("/products").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 }
]), (0, Validator_1.bodyValidator)(product_request_1.ProductCreateDTO), productCtrl.createProduct);
// Localhost:9005/products
productRouter.get("/", (0, Auth_1.default)(["admin"]), productCtrl.getAllProductsByUser);
productRouter.get("/:productSlug", (0, Auth_1.default)(["admin"]), productCtrl.getProductDetailBySlug);
productRouter.put("/:productSlug", (0, Auth_1.default)(["admin"]), (0, Uploader_1.default)("/products").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 }
]), (0, Validator_1.bodyValidator)(product_request_1.ProductCreateDTO), productCtrl.updateProduct);
productRouter.delete("/:productId", (0, Auth_1.default)(["admin"]), productCtrl.deleteProductById);
exports.default = productRouter;
//# sourceMappingURL=product-router.js.map