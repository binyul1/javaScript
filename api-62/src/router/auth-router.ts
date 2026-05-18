import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import AuthCheck from "../middleware/Auth";
import AuthController from "../controller/AuthController";
import LoginSchema from "../request/auth-request";

const authCtrl = new AuthController()

const authRouter = Router();

authRouter.post("/login", bodyValidator(LoginSchema), authCtrl.login);
authRouter.get("/me", AuthCheck(), authCtrl.getLoggedInUserDetail);

// paramterized routes
authRouter.get("/:userId", authCtrl.getUserDetailById);


export default authRouter