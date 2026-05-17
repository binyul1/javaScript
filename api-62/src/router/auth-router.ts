import { Router } from "express";
import AuthController from "../controller/AuthController";
import AuthCheck from "../middleware/Auth";
import { bodyValidator } from "../middleware/Validator";
import LoginSchema from "../request/auth-request";

const Authctrl = new AuthController();

const authRouter = Router();
authRouter.post("/login", bodyValidator(LoginSchema), Authctrl.login);

authRouter.get("/me", AuthCheck(), Authctrl.getLoggedInUserDetail);

//parameterized route
authRouter.get("/:userId", Authctrl.getUserDetailId);

export default authRouter;
