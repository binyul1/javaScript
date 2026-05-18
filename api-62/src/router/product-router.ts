import { Router } from "express";
import ProductController from "../controller/ProductController";
import uploader from "../middleware/Uploader";
// import { bodyValidator } from "../middleware/Validator";

const productRouter = Router()
const productCtrl = new ProductController()

// .none() => if content-type is multipart/form-data but no file upload
// .single(nameOfFileUploadingField) => if content-type if multipart/form-data and a field has a single file upload
// .array(nameOfFileUploadingField, maxCount) 
// .fields([{name: FieldName, maxCount: number}])

productRouter.post(
  "/create",
  // uploader().single("thumbnail"),
  // uploader().array("images"),
  uploader("/products").fields([
    {name: "thumbnail", maxCount: 1},
    {name: "images", maxCount: 10}
  ]),
  productCtrl.createProduct,
);


export default productRouter