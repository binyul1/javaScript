import ProductModel from "../model/ProductModel";

class ProductService{
    async createProduct(data: any){
        try{
            const product = new ProductModel(data);
            return await product.save();
        } catch(exception){
            throw exception;
        }
    }
}

export default new ProductService();