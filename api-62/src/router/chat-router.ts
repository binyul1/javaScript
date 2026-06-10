import { Router } from "express";
import { bodyValidator } from "../middleware/Validator";
import z from "zod";
import AuthCheck from "../middleware/Auth";
import ChatController from "../controller/ChatController"
const ChatRouter = Router()
const chatCtrl = new ChatController()

const chatCreateDTO = z.object({
    sender : z.string().nonempty(),
    reciever : z.string().nonempty(),
    message : z.string().min(1).max(65535),
})

ChatRouter.post('/',AuthCheck(),bodyValidator(chatCreateDTO),chatCtrl.storeChat)
ChatRouter.post('/:sender',AuthCheck(),chatCtrl.getAllChatByUser)

ChatRouter.put("/:id", AuthCheck(), bodyValidator(chatCreateDTO), chatCtrl.updateChatByFilter )
ChatRouter.delete("/:id", AuthCheck(), bodyValidator(chatCreateDTO), chatCtrl.deleteChatByFilter )

export default ChatRouter