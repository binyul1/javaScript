import express, {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel";
import AuthService from "../services/AuthService";
import jwt from "jsonwebtoken";
import { AppConfig, Secrets } from "../config/app-env";
import type { AuthRequest } from "../types/Request";
import EmailService from "../services/EmailService";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file, req.body);
      const data = AuthService.mapUserDataForRegister(req);
      const user = await AuthService.storeUser(data);

      //notify user account regestered
      // provider sdk integrate
      const emailSvc = new EmailService();
      await emailSvc.sendEmail({
        to: user.email,
        subject: "Your account registered successfully",
        body: `<Strong>Hello ${user.firstName},</Strong>
          <p>Your account has been registered. Please login to continue.</p>
          <div>
            <strong>Admin System</strong>
          </div>`,
      });

      res.json({
        data: user,
        message: "User Account registered successfully",
        meta: null,
      });
    } catch (exceptation) {
      next(exceptation);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // data
      const credentials = req.body;
      // .findById(id)
      // .find(filter)
      // .findOne(filter)
      const userDetail = await UserModel.findOne({
        $or: [
          { username: credentials.username },
          { email: credentials.username },
        ],
      });

      if (!userDetail) {
        throw { code: 422, message: "User not found." };
      }

      // password verify
      if (!bcrypt.compareSync(credentials.password, userDetail.password)) {
        throw { code: 422, message: "Credentials does not match." };
      }

      const expiresInMinutes = Number(credentials.expiresInMinutes) || 180;
      const token = jwt.sign(
        { sub: userDetail._id, typ: "Bearer" },
        Secrets.jwtSecret as string,
        {
          expiresIn: `${expiresInMinutes}m`,
        },
      );

      res.json({
        data: {
          accessToken: token,
        },
        message: "Login success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserDetailById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // this function or route is only accessed by loggedin User =>
    try {
      const params = req.params;
      const userDetail = await UserModel.findById(params.userId, {
        password: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });
      if (!userDetail) {
        throw { code: 404, message: "User not found" };
      }
      res.json({
        data: userDetail,
        message: "User Detail",
        meta: null,
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };

  getLoggedInUserDetail(req: AuthRequest, res: Response, next: NextFunction) {
    const loggedInUser = req.loggedInUser;
    res.json({
      data: {
        ...req.loggedInUser,
        image: `${AppConfig.assetsUrl}uploads/users/${loggedInUser?.image?.filename}`,
      },
      message: "User Detail",
      meta: null,
    });
  }
}
export default AuthController;
