import type { Request,Response ,NextFunction } from "express"
import MessageService from "../services/MessageService";
import { Op } from "sequelize";
import type { AuthRequest } from "../types/Request";

class ChatController {
    async storeChat(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body;
            const newMessage = await MessageService.store(data);
            res.json({
                data: newMessage,
                message: "new message sent",
                meta: null
            })
        } catch (exceptation) {
            next (exceptation)
        }
    }

    async getAllChatByUser(req:AuthRequest, res:Response, next: NextFunction){
        try {
            const loggedInUser = req.loggedInUser;
            let filter = {
                [Op.or]: [
                    { sender: req.params.sender, reciever: loggedInUser?._id as string },
                    { reciever: req.params.sender, sender: loggedInUser?._id as string }
                ],
            }
            const page = (req.query.page || 1) as number
            const limit = (req.query.limit || 10) as number 
            const {rows, pagination} = await MessageService.getAllByFilter(filter, {page, limit});
            res.json({
                data: rows,
                message: "your messages",
                meta: {
                    pagination

                }
            })
        } catch (exceptation) {
            next(exceptation)
        }
    }

    async updateChatByFilter (req: Request, res: Response, next: NextFunction){
        try{
            const message = await MessageService.getSingleRowByFilter({id: req.params.id})
            if (!message){
                throw {code: 402, message: "chat not found"}
            }
            const updated =  await MessageService.updateSingleRowByFilter({id:req.params.id}, req.body)
            res.json({
                data: message,
                message: "chat updated successfully",
                meta: null
            })
        } catch(exceptation){
            next (exceptation)
        }
    }
    async deleteChatByFilter (req: Request, res: Response, next: NextFunction){
        try{
            const message = await MessageService.getSingleRowByFilter({id: req.params.id})
            if (!message){
                throw {code: 402, message: "chat not found"}
            }
            const update =  await MessageService.deleteSingleRowByFilter({id:req.params.id})
            res.json({
                data: message,
                message: "chat deleted successfully",
                meta: null
            })
        } catch(exceptation){
            next (exceptation)
        }
    }
}
export default ChatController