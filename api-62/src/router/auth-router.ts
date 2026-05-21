import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import AuthCheck from "../middleware/Auth";
import AuthController from "../controller/AuthController";
import { LoginSchema } from "../request/auth-request";
import uploader from "../middleware/Uploader";

const authCtrl = new AuthController()

const authRouter = Router();

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.post("/register",uploader("/users").single("image"),authCtrl.register);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);


// paramterized routes
authRouter.get("/:userId", authCtrl.getUserDetailById);


export default authRouter