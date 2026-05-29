import type { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import slugify from "slugify";
import CategoryModel from "../model/CategoryModel";
import ProductModel from "../model/ProductModel";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const data = req.body; // except file
    
    //slug
    // let counter = 1;
    let slug = slugify(data.title,{
      lower : true,
    })
    if (await ProductModel.findOne({slug: data.slug})){
      slug = slug + "-" + Date.now()
    }

    data.price = data.price * 100;
    data.afterDiscount = data.price - (data.price * data.discountPercentage) / 100;

    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>;
      images: Array<Express.Multer.File>;
    };

    if (files && files?.thumbnail && files.thumbnail.length) {
      data.thumbnail = {
        originalname: files.thumbnail[0].originalname,
        size: files.thumbnail[0].size,
        filename: files.thumbnail[0].filename,
        destination: files.thumbnail[0].destination,
      };
    }

    if (files && files.images && files.images.length) {
      data.images = files.images.map((image) => {
        return {
          originalname: image.originalname,
          size: image.size,
          filename: image.filename,
          destination: image.destination,
        };
      });
      }
      // product create
    const product = await ProductService.createProduct(data);
    res.json({
      data : product,
      message: "Product created successfully",
      meta: null,
    })
    
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
