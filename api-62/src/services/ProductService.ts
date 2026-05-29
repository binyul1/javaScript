import slugify from "slugify";
import ProductModel from "../model/ProductModel";
import type { Request } from "express";
import { mapImage } from "../utilities/helpers";
import { data } from "autoprefixer";

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
  static async mapProductForModel(req: Request) {
    const data = { ...req.body } as Record<string, any>; // except file

    data.slug = await ProductService.generateUniqueSlug(data.title);

    const price = Number(data.price);
    const discountPercentage = Number(data.discountPercentage) || 0;

    data.price = price * 100;
    data.discountPercentage = discountPercentage;
    data.afterDiscount =
      data.price - (data.price * data.discountPercentage) / 100;

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
}

export default ProductService;
