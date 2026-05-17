import { Router } from "express";
import ProductController from "../controller/ProductController";
import uploader from "../middleware/Uploader";

const productRouter = Router();
const productCtrl = new ProductController();


// .none() = if content-type is multipart/form/data but no file is upload
// .single() = 

productRouter.post("/create", uploader().single("thumbnail"), productCtrl.create);

export default productRouter;
