"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const helpers_1 = require("../utilities/helpers");
const app_env_1 = require("../config/app-env");
class ProductService {
    static async generateUniqueSlug(title) {
        //slug
        // let counter = 1;
        let slug = (0, slugify_1.default)(title, {
            lower: true,
        });
        while (await ProductModel_1.default.findOne({ slug: slug })) {
            slug = slug + "-" + Date.now();
        }
        return slug;
    }
    static async mapProductForModel(req) {
        const data = req.body;
        data.slug = await ProductService.generateUniqueSlug(data.title);
        const price = data.price * 100;
        data.afterDiscount = data.discountPercentage
            ? data.price - (data.price * data.discountPercentage) / 100
            : data.price;
        // const file = req.file;    // for single file upload
        const files = req.files;
        if (files && files?.thumbnail && files.thumbnail.length) {
            data.thumbnail = (0, helpers_1.mapImage)(files.thumbnail[0]);
        }
        if (files && files.images && files.images.length) {
            data.images = files.images.map((image) => {
                return (0, helpers_1.mapImage)(image);
            });
        }
        data.createdBy = req?.loggedInUser?._id;
        return data;
    }
    static async mapProductForUpdateModel(req, oldProduct) {
        const data = req.body;
        const price = data.price * 100;
        data.afterDiscount = data.discountPercentage
            ? data.price - (data.price * data.discountPercentage) / 100
            : data.price;
        // const file = req.file;    // for single file upload
        const files = req.files;
        if (files && files?.thumbnail && files.thumbnail.length) {
            data.thumbnail = (0, helpers_1.mapImage)(files.thumbnail[0]);
        }
        else {
            data.thumbnail = oldProduct.thumbnail;
        }
        data.images = [...oldProduct.images]; // add old images to new images array by default
        if (files && files.images && files.images.length) {
            const images = files.images.map((image) => {
                return (0, helpers_1.mapImage)(image);
            });
            data.images = [...data.images, ...images];
        }
        data.updatedBy = req?.loggedInUser?._id;
        return data;
    }
    static async createProduct(data) {
        try {
            const product = new ProductModel_1.default(data);
            return await product.save();
        }
        catch (exception) {
            throw exception;
        }
    }
    static mapProductDetail(prod) {
        return {
            thumbnail: `${app_env_1.AppConfig.assetsUrl}uploads/products/${prod.thumbnail?.filename}`,
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
    static async getAllRowsByFilter(filter = {}, projection = {}, config) {
        try {
            const skip = (config.page - 1) * config.limit;
            const productList = await ProductModel_1.default.find(filter, projection)
                .populate("category", "title") //foreign key reference populate
                .sort({ createdAt: "desc" }) //sorting by createdAt field in descending order
                .skip(skip) //pagination skip
                .limit(config.limit); //pagination limit
            const totalProducts = await ProductModel_1.default.countDocuments(filter);
            return {
                rows: productList.map(ProductService.mapProductDetail),
                pagination: {
                    current: +config.page,
                    limit: +config.limit,
                    total_count: totalProducts,
                    noOfPages: Math.ceil(totalProducts / +config.limit),
                },
            };
        }
        catch (exception) {
            throw exception;
        }
    }
    static async getSingleRowByFilter(filter) {
        try {
            const data = await ProductModel_1.default.findOne(filter).populate("category", "title"); //foreign key reference populate;
            return data;
        }
        catch (exception) {
            throw exception;
        }
    }
    static async updateSingleRowByFilter(filter, mappedData) {
        try {
            //data found -> update -> before update data will be returned
            // if new is mentioned as true then data found -> update -> after update data will be returned
            const update = await ProductModel_1.default.findOneAndUpdate(filter, mappedData, { new: true });
            // const update = await ProductModel.updateOne(filter, mappedData); 
            // only acknowledgement will be sent
            // await ProductModel.findByIdAndUpdate(id, mappedDate)
            return update;
        }
        catch (exception) {
            throw exception;
        }
    }
    static async deleteSingleRowByFilter(filter) {
        try {
            const del = await ProductModel_1.default.findOneAndDelete(filter);
            return del;
        }
        catch (exception) {
            throw exception;
        }
    }
}
exports.default = ProductService;
//# sourceMappingURL=ProductService.js.map