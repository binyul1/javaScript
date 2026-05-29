import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel";
import type { AuthRequest } from "../types/Request";

const AuthCheck = (role: null | Array<string> = null) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
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
        token = String(token).replace(/^Bearer\s+/i, "");
        //Token :verify
        const data = jwt.verify(token, process.env.JWT_SECRET as string);

        // const userDetail = await UserModel.findById(data.sub);
        const userDetail = await UserModel.findOne({ _id: data.sub });
        if (!userDetail) {
          next({ code: 401, message: "User not found" });
        } else {
          // user exists
          req.loggedInUser = {
            image: userDetail.image as unknown as null,
            _id: userDetail._id as unknown as string,
            firstName:userDetail.firstName,
            maidenName: userDetail.maidenName,
            lastName:userDetail.lastName,
            email: userDetail.email,
            username: userDetail.username,
            phone: userDetail.phone,
            role: userDetail.role
          };
          if (
            !role ||
            (role && role.includes(userDetail.role))
             || userDetail.role === "admin"
          ) {
            next();
          } else {
            throw { code: 403, message: "Acess Denied" };
          }
        }
      }
    } catch (exceptation) {
      if (exceptation instanceof jwt.TokenExpiredError) {
        next({ code: 401, message: "Token expired" });
      } else if (exceptation instanceof jwt.JsonWebTokenError) {
        next({ code: 401, message: "JWT Error: " + (exceptation as Error).message });
      } else {
        next(exceptation);
      }
    }
  };
};

export default AuthCheck;
