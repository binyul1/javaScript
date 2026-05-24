import { type Request, type Response, type NextFunction } from "express";

const AuthCheck = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // jwt token
    // jwt token verify
    // Todo: check if user is logged in or not
    // next execute
    try {
      let token = req.headers.authorization || null;
      if (!token) {
        next({ code: 401, message: "Login required" });
      } else {
        //token is present
        //how jwt token is verified
        // verify token
        token = token.replace("Bearer", "");
        //Token :verify
      }
    } catch (exceptation) {}
  };
};

export default AuthCheck;
