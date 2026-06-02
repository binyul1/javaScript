import slugify from "slugify";
import ProductModel from "../model/ProductModel";
import { mapImage } from "../utilities/helpers";
import type { AuthRequest } from "../types/Request";
import { AppConfig } from "../config/app-env";

class ProductService {
  static async generateUniqueSlug(title: string) {
    //slug
    // let counter = 1;
    let slug = slugify(title, {
      lower: true,
    });
    while (await ProductModel.findOne({ slug: slug })) {
      slug = slug + "-" + Date.now();
    }
    return slug;
  }

  static async mapProductForModel(req: AuthRequest) {
    const data = req.body;
    data.slug = await ProductService.generateUniqueSlug(data.title);

    const price = data.price * 100;
    data.afterDiscount = data.discountPercentage
      ? data.price - (data.price * data.discountPercentage) / 100
      : data.price;
    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>;
      images: Array<Express.Multer.File>;
    };

    if (files && files?.thumbnail && files.thumbnail.length) {
      data.thumbnail = mapImage(files.thumbnail[0]);
    }

    if (files && files.images && files.images.length) {
      data.images = files.images.map((image) => {
        return mapImage(image);
      });
    }

    data.createdBy = req?.loggedInUser?._id;

    return data;
  }

  static async mapProductForUpdateModel(
    req: AuthRequest,
    oldProduct: any,
  ) {
    const data = req.body;

    const price = data.price * 100;
    data.afterDiscount = data.discountPercentage
      ? data.price - (data.price * data.discountPercentage) / 100
      : data.price;

    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>;
      images: Array<Express.Multer.File>;
    };

    if (files && files?.thumbnail && files.thumbnail.length) {
      data.thumbnail = mapImage(files.thumbnail[0]);
    } else {
      data.thumbnail = oldProduct.thumbnail;
    }

    data.images = [...oldProduct.images]; // add old images to new images array by default

    if (files && files.images && files.images.length) {
      const images = files.images.map((image) => {
        return mapImage(image);
      });
      data.images = [...data.images, ...images];
    }

    data.updatedBy = req?.loggedInUser?._id;

    return data;
  }

  static async createProduct(data: any) {
    try {
      const product = new ProductModel(data);
      return await product.save();
    } catch (exception) {
      throw exception;
    }
  }

  static mapProductDetail(prod: any) {
    return {
      thumbnail: `${AppConfig.assetsUrl}uploads/products/${prod.thumbnail?.filename}`,
      _id: prod._id,
      title: prod.title,
      slug: prod.slug,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      discountPercentage: prod.discountPercentage,
      afterDiscount: prod.afterDiscount,
      stock: prod.stock,
      tags: prod.tags,
      brand: prod.brand,
      availabilityStatus: prod.availabilityStatus,
      minimumOrderQuantity: prod.minimumOrderQuantity,
    };
  }

  static async getAllRowsByFilter(
    filter = {},
    projection = {},
    config: { page: number; limit: number },
  ) {
    try {
      const skip = (config.page - 1) * config.limit;
      const productList = await ProductModel.find(filter, projection)
        .populate("category", "title") //foreign key reference populate
        .sort({ createdAt: "desc" }) //sorting by createdAt field in descending order
        .skip(skip) //pagination skip
        .limit(config.limit); //pagination limit
      const totalProducts = await ProductModel.countDocuments(filter);
      return {
        rows: productList.map(ProductService.mapProductDetail),
        pagination: {
          current: +config.page,
          limit: +config.limit,
          total_count: totalProducts,
          noOfPages: Math.ceil(totalProducts / +config.limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  static async getSingleRowByFilter(filter: Record<string, any>) {
    try {
      const data = await ProductModel.findOne(filter).populate(
        "category",
        "title",
      ); //foreign key reference populate;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  static async updateSingleRowByFilter(filter: Record<string, any>, mappedData: any){
    try{
      //data found -> update -> before update data will be returned
      // if new is mentioned as true then data found -> update -> after update data will be returned
      const update = await ProductModel.findOneAndUpdate(filter, mappedData, {new: true}); 
      // const update = await ProductModel.updateOne(filter, mappedData); 

      // only acknowledgement will be sent
      // await ProductModel.findByIdAndUpdate(id, mappedDate)
      return update;
    }catch(exception){
      throw exception;
    }
  }

  static async deleteSingleRowByFilter(filter: Record<string, any>){
    try{
      const del = await ProductModel.findOneAndDelete(filter);
      return del;
      
    }catch(exception){
      throw exception;  
    
    }
  }
}



export default ProductService;
