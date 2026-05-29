import slugify from "slugify";
import ProductModel from "../model/ProductModel";
import { mapImage } from "../utilities/helpers";
import type { AuthRequest } from "../types/Request";

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

  static async createProduct(data: any) {
    try {
      const product = new ProductModel(data);
      return await product.save();
    } catch (exception) {
      throw exception;
    }
  }

  static async getAllRowsByFilter(
    filter = {},
    projection = {},
    config: { page: number; limit: number },
  ) {
    try {
      const skip = (config.page - 1) * config.limit;
      const productList = await ProductModel.find(filter, projection)
        .populate("category","slug-_id")//foreign key reference populate
        .sort({ createdAt: "desc" })//sorting by createdAt field in descending order
        .skip(skip)//pagination skip
        .limit(config.limit);//pagination limit
      const totalProducts = await ProductModel.countDocuments(filter);
      return {
        rows: productList,
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
}

export default ProductService;
