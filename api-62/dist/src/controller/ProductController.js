"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../services/ProductService"));
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
// Method	Returns	Use Case
// find()	Array	Many results
// findOne()	Object	Single result
// findById()	Object	By _id
// findOneAndUpdate()	Object	Update + get
// findOneAndDelete()	Object	Delete + get
// countDocuments()	Number	Count
// exists()	Boolean-ish	Check existence
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
    async getProductDetailBySlug(req, res, next) {
        try {
            const slug = req.params.productSlug;
            const productDetail = await ProductService_1.default.getSingleRowByFilter({
                slug: slug,
            });
            if (!productDetail) {
                throw { code: 404, message: "Product not found " };
            }
            res.json({
                data: productDetail,
                message: "Product fetched successfully",
                meta: null,
            });
        }
        catch (exception) {
            throw exception;
        }
    }
    async homeGetProductDetailBySlug(req, res, next) {
        try {
            const slug = req.params.productSlug;
            const productDetail = await ProductService_1.default.getSingleRowByFilter({
                slug: slug,
                availabilityStatus: {
                    $ne: "not available",
                },
            });
            if (!productDetail) {
                throw { code: 404, message: "Product not found at home" };
            }
            const { rows } = await ProductService_1.default.getAllRowsByFilter({
                category: productDetail.category._id,
                availabilityStatus: { $ne: "not available" },
            }, {
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
            }, {
                page: 1,
                limit: 8,
            });
            res.json({
                data: {
                    detail: productDetail,
                    relatedProducts: rows,
                    reviews: null,
                },
                message: "Product fetched successfully",
                meta: null,
            });
        }
        catch (exception) {
            throw exception;
        }
    }
    async updateProduct(req, res, next) {
        try {
            const slug = req.params.productSlug;
            const productDetail = await ProductService_1.default.getSingleRowByFilter({
                slug: slug,
            });
            if (!productDetail) {
                throw { code: 404, message: "Product not found" };
            }
            const mappedData = await ProductService_1.default.mapProductForUpdateModel(req, productDetail);
            //update
            const update = await ProductService_1.default.updateSingleRowByFilter({ slug: slug }, mappedData);
            res.json({
                data: update,
                message: "Product updated successfully",
                meta: null,
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async deleteProductById(req, res, next) {
        try {
            const productId = req.params.productId;
            // const productDetail = await ProductService.getSingleRowByFilter({ _id: productId });
            // if (!productDetail) {
            //   throw { code: 404, message: "Product not found" };
            // }
            const deletedStatus = await ProductService_1.default.deleteSingleRowByFilter({
                _id: productId,
            });
            if (!deletedStatus) {
                throw { code: 404, message: "Product does not exist" };
            }
            res.json({
                data: deletedStatus,
                message: "Product deleted successfully",
                meta: null,
            });
        }
        catch (exception) {
            next(exception);
        }
    }
    async getAllProductByCatSlug(req, res, next) {
        try {
            //db query
            const catDetail = await CategoryModel_1.default.findOne({ slug: req.params.slug });
            if (!catDetail) {
                throw { code: 404, message: "Category not found" };
            }
            const paginationConfig = {
                page: Number(req?.query?.page) || 1,
                limit: Number(req?.query?.limit) || 10,
            };
            let filter = {
                availabilityStatus: {
                    $ne: "not available",
                },
                category: {
                    $eq: catDetail._id,
                }
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
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map