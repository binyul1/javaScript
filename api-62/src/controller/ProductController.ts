import type { Request, Response, NextFunction } from "express";
class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    //
    const data = req.body; // except file

    data.price = data.price * 100;
    data.afterDiscount = data.price - (data.price * data.discount) / 100;

    // const file = req.file;    // for single file upload
    const files = req.files as {
      thumbnail: Array<Express.Multer.File>,
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

    res.json({
      // file: file,
      // files: files,
      data: data,
    });
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    res.json()
  }
}

export default ProductController;
