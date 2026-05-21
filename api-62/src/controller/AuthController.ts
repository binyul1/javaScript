import express, {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      if (!data.role) {
        data.role = "user";
      }
      //password -> plaintext

      data.password = bcrypt.hashSync(data.password, 12);

      if (req.file) {
        data.image = {
          originalName: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          destination: req.file.destination,
        };
      }
      // db store
      const user = new UserModel(data);
      await user.save();
      res.json({
        data: user,
        message: "User Account registered successfully",
        meta: null
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    //data
    const credentials = req.body;
    // validate the credentials

    res.json({
      data: credentials,
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
