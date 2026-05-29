import type { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import CategoryModel from "../model/CategoryModel";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try{
      const data = await ProductService.mapProductForModel(req);
      // product create
      const product = await ProductService.createProduct(data);
      res.json({
        data : product,
        message: "Product created successfully",
        meta: null,
      })
    }catch(exception){
      next(exception);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    res.json({});
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try{
      const cat = await CategoryModel.find()
      res.json({
        data : cat,
        message: "Categories fetched successfully",
        meta: null,
      })
    }catch(exception){
      next(exception);
    }
  }
  
} 

export default ProductController;
