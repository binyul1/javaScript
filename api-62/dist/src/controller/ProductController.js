"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../services/ProductService"));
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
class ProductController {
    async createProduct(req, res, next) {
        try {
            const data = await ProductService_1.default.mapProductForModel(req);
            // product create
            const product = await ProductService_1.default.createProduct(data);
            res.json({
                data: product,
                message: "Product created successfully",
                meta: null,
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async getAllProductsByUser(req, res, next) {
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
                        { title: new RegExp(req.query.search, "i") },
                        { description: new RegExp(req.query.search, "i") },
                    ],
                };
            }
            const { rows, pagination } = await ProductService_1.default.getAllRowsByFilter(filter, {
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
            }, paginationConfig);
            res.json({
                data: rows,
                message: "Products fetched successfully",
                meta: { pagination },
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async getAllProducts(req, res, next) {
        // Data fetch operation
        // stock available products
        // public api
        try {
            //db query
            const paginationConfig = {
                page: Number(req?.query?.page) || 1,
                limit: Number(req?.query?.limit) || 10,
            };
            let filter = {
                availabilityStatus: {
                    $ne: "not available",
                },
            };
            if (req.query.search) {
                filter = {
                    ...filter,
                    $or: [
                        { title: new RegExp(req.query.search, "i") },
                        { description: new RegExp(req.query.search, "i") },
                    ],
                };
            }
            const { rows, pagination } = await ProductService_1.default.getAllRowsByFilter(filter, {
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
            }, paginationConfig);
            res.json({
                data: rows,
                message: "Products fetched for public successfully",
                meta: { pagination },
            });
        }
        catch (exception) {
            console.log(exception);
            next(exception);
        }
    }
    async getAllCategories(req, res, next) {
        try {
            const cat = await CategoryModel_1.default.find();
            res.json({
                data: cat,
                message: "Categories fetched successfully",
                meta: null,
            });
        }
        catch (exception) {
            next(exception);
        }
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map