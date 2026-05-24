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
import { Secrets } from "../config/app-env";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = AuthService.mapUserDataForRegister(req);
      console.log(data);
      // db store
      const user = new UserModel(data);
      await user.save();
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
    //data
    const credentials = req.body;
    // validate the credentials
    const userDetail = await UserModel.findOne({
      $or: [
        { username: credentials.username },
        { email: credentials.username },
      ],
    });

    if (!userDetail) {
      throw { code: 422, message: "User not found" };
    }

    if (!bcrypt.compareSync(credentials.password, userDetail.password)) {
      throw { code: 422, message: "Credentials doesnot match" };
    }

    const token = jwt.sign(
      { sub: userDetail._id, type: "Bearer" },
      Secrets.jwtSecret as string,
      {
        expiresIn: credentials.expiresInMinutes || 180,
      },
    );

    res.json({
      data: {
        accessToken: token,
      },
      message: "Login Success",
      meta: null,
    });
  };

  getUserDetailById = (req: Request, res: Response, next: NextFunction) => {
    // this function or route is only accessed by loggedin User =>
    const params = req.params;
    const query = req.query;

    // {key:value} => {string: value}
    //TODO: db query for fetching the user detail
    const data = {
      id: params.userId,
      query: query,
    };

    res.json({
      data: data,
      message: "user detail",
      meta: null,
    });
  };

  getLoggedInUserDetail(req: Request, res: Response, next: NextFunction) {
    res.json({
      data: {
        user: {
          id: "1234",
        },
      },
      name: "User Detail",
      meta: null,
    });
  }
}
export default AuthController;
