import type { Request, Response, NextFunction } from "express";
import ProductService from "../services/ProductService";
import CategoryModel from "../model/CategoryModel";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.mapProductForModel(req);
      // product create
      const product = await ProductService.createProduct(data);
      res.json({
        data: product,
        message: "Product created successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProductsByUser(req: Request, res: Response, next: NextFunction) {
    //cms
    try {
      //db query
      const paginationConfig = {
        page: Number(req?.query?.page) || 1,
        limit: Number(req?.query?.limit) || 10,
      };
      let filter = {};
      if (req.query.search) {
        filter = {
          $or: [
            { title: new RegExp(req.query.search as string, "i") },
            { description: new RegExp(req.query.search as string, "i") },
          ],
        };
      }
      const { rows, pagination } = await ProductService.getAllRowsByFilter(
        filter,
        {
          dimensions: 0,
          weight: 0,
          shippingInformation: 0,
          warrantyInformation: 0,
          returnPolicy: 0,
          images: 0,
          updatedBy: 0,
          createdBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        paginationConfig,
      );
      res.json({
        data: rows,
        message: "Products fetched successfully",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    // Data fetch operation
    // stock available products
    // public api
    try {
      //db query

      const paginationConfig = {
        page: Number(req?.query?.page) || 1,
        limit: Number(req?.query?.limit) || 10,
      };
      let filter: Record<string, any> = {
        availabilityStatus: {
          $ne: "not available",
        },
      };
      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { title: new RegExp(req.query.search as string, "i") },
            { description: new RegExp(req.query.search as string, "i") },
          ],
        };
      }
      const { rows, pagination } = await ProductService.getAllRowsByFilter(
        filter,
        {
          dimensions: 0,
          weight: 0,
          shippingInformation: 0,
          warrantyInformation: 0,
          returnPolicy: 0,
          images: 0,
          updatedBy: 0,
          createdBy: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
        paginationConfig,
      );
      res.json({
        data: rows,
        message: "Products fetched for public successfully",
        meta: { pagination },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const cat = await CategoryModel.find();
      res.json({
        data: cat,
        message: "Categories fetched successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

export default ProductController;
