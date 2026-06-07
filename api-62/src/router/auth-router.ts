import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import AuthCheck from "../middleware/Auth";
import AuthController from "../controller/AuthController";
import { LoginSchema, UserRegisterSchema } from "../request/auth-request";
// import uploader from "../middleware/Upload";
import cloudinaryUploader from "../middleware/CloudinaryUploader";

const authCtrl = new AuthController()

const authRouter = Router();

// authRouter.post("/register", uploader("/users").single("image"), bodyValidator(UserRegisterSchema), authCtrl.register);
authRouter.post("/register", cloudinaryUploader("/users").single("image"), bodyValidator(UserRegisterSchema), authCtrl.register);

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);


// paramterized routes
authRouter.get("/:userId", AuthCheck(["admin"]), authCtrl.getUserDetailById);
        

export default authRouter