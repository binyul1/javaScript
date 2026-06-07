import type { Request, Response, NextFunction } from "express";
import UserModel from "../model/UserModel";

class UserController {
    async getAllUserList(req: Request, res: Response, next: NextFunction) {
        try{
            const userList = await UserModel.find({},{password: 0, __v: 0, "image.destination": 0, "image.originalName": 0, "image.size": 0 });
            res.json({
                data:userList,
                message:"User list retrieved",
                meta:{
                    pagination:{}
                }
            })
        }
        catch(exceptation){
            next(exceptation);
        }
    }
}

export default UserController;