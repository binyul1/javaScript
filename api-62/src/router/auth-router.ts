import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import AuthCheck from "../middleware/Auth";
import AuthController from "../controller/AuthController";
import { LoginSchema, UserRegisterSchema } from "../request/auth-request";
import uploader from "../middleware/Uploader";

const authCtrl = new AuthController()

const authRouter = Router();

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.post("/register", uploader("/users").single("image"), bodyValidator(UserRegisterSchema),  authCtrl.register);
authRouter.get("/me", AuthCheck(["admin"]), authCtrl.getLoggedInUserDetail);


// paramterized routes
authRouter.get("/:userId", AuthCheck(), authCtrl.getUserDetailById);
        

export default authRouter