import mongoose from "mongoose";
import CategoryModel from "./CategoryModel";
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 200,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    min: 10,
    max: 500,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  afterDiscount:{
    type:Number,
    required:true,
  },

  stock: {
    type: Number,
  },
  tags: [
    {
      type: String,
      default: null,
      required: false,
    },
  ],
  brand: {
    type: String,
  },
  weight: Number,
  dimensions: {
    sizes: [String],
    width: Number,
    height: Number,
    depth: Number,
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: {
    type: String,
    enum: ["in stock", "out of stock", "preorder", "available"],
    default: "available",
  },
  returnPolicy: String,
  minimumOrderQuantity: {
    type: Number,
    default: 1,
  },
  thumbnail: {
    originalName: String,
    fileName: String,
    size: Number,
    destination: String,
  },
  images: [
    {
      originalName: String,
      fileName: String,
      size: Number,
      destination: String,
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  }},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
