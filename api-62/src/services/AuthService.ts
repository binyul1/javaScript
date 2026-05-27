import type { Request } from "express";
import bcrypt from "bcryptjs";
import type { IUserRegisterDetail } from "../request/auth-request";
import UserModel from "../model/UserModel";

class AuthService {
  static mapUserDataForRegister(req: Request) {
    const data = req.body;
    if (!data.role) {
      data.role = "user";
    }
    //password -> plaintext

    data.password = bcrypt.hashSync(data.password, 12);

    if (req.file) {
      data.image = {
        originalName: req.file.originalname ?? null,
        fileName: req.file.filename ?? null,
        size: req.file.size ?? null,
        destination: req.file.destination ?? null,
      };
    }
    return data as IUserRegisterDetail;
  }
  static async storeUser(data: IUserRegisterDetail) {
    const user = new UserModel(data);
    return await user.save(); // save() -=> insert, existing data .save() => update
  }
}

export default AuthService;
