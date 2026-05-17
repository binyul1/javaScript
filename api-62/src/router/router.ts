import { Router } from "express";
import { healthCheck } from "../controller/TestController";
import authRouter from "./auth-router";
import productRouter from "./product-router";

//router
const router: Router = Router();

//for any method
// app.use('/');
// this method accepts any method type for given url
// app.use('path' ,(req:Request, res:Response, next:NextFunction)=>{// definition her s });

router.get("/", healthCheck);
router.use("/auth", authRouter);
router.use("/product", productRouter);

export default router;
