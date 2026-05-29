import { Router } from "express";
import ProductController from "../controller/ProductController";
import getAllProducts from "../controller/ProductController";
import uploader from "../middleware/Uploader";
import AuthCheck from "../middleware/Auth";
import { bodyValidator } from "../middleware/Validator";
import { ProductCreateDTO } from "../request/product-request";

const productRouter = Router()
const productCtrl = new ProductController();

// .none() => if content-type is multipart/form-data but no file upload
// .single(nameOfFileUploadingField) => if content-type if multipart/form-data and a field has a single file upload
// .array(nameOfFileUploadingField, maxCount) 
// .fields([{name: FieldName, maxCount: number}])
productRouter.get("/categories", AuthCheck(["admin"]), productCtrl.getAllCategories);

productRouter.post("/",AuthCheck(["admin"]),
  // uploader().single("thumbnail"),
  // uploader().array("images"),
  uploader("/products").fields([
    {name: "thumbnail", maxCount: 1},
    {name: "images", maxCount: 10}]),
    bodyValidator(ProductCreateDTO), productCtrl.createProduct,
);

productRouter.get("/", productCtrl.getAllProducts);

export default productRouter