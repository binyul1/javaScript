import MessageModel from "../model/MessageModel";

class MessageService{
    //CURD
    static async store(data:{sender:string, reciever:string, messaage:string}){
        try {
            const message = await MessageModel.create(data);
            return message;
        } catch (exceptation) {
            throw exceptation
        }
    }

    //list all fetch
    static async getAllByFilter(filter:Record<string, any>, paginationConfig= {page:1, limit:10}){
        try {
            const skip = (paginationConfig.page-1) * paginationConfig.limit
            const {rows, count} = await MessageModel.findAndCountAll({
                where: filter,
                order: [['createdAt', 'desc']],
                offset: skip,
                limit: paginationConfig.limit
            })
            return{
                rows,
                pagination:{
                    total: count,
                    limit: paginationConfig.limit,
                    page: paginationConfig.page
                }
            }
        } catch (exceptation) {
            throw(exceptation)
        }
    }

    // detail
    static async getSingleRowByFilter(filter: Record<string, any>){
        try {
            const data = await MessageModel.findOne({
                where: filter
            })
            return data;
        } catch (exceptation) {
            throw (exceptation)
        }
    }

    //Update
    static async updateSingleRowByFilter(filter: Record<string, any>,data:{sender:string, reciever:string, messaage:string} ){
        try {
            const updateResult = await MessageModel.update(data, {
                where: filter,

            })
            return updateResult
        } catch (exceptation) {
            throw exceptation
        }
    }

    // Delete
    static async deleteSingleRowByFilter(filter: Record<string,any>){
        try {
            const deletedResult = await MessageModel.destroy({
                where: filter
            })
            return deletedResult
        } catch (exceptation) {
            throw exceptation
        }
    }
}

export default MessageService