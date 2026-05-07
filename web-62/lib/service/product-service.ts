import { BASE_URL } from "../config/app";
import type { IProductDetail, IProductListResponse } from "../types/product";

class ProductService {
  static async getAllProducts() {
    try {
      const response = await fetch(BASE_URL + "products");
      const data = (await response.json()) as IProductListResponse;
      return data.products;
    } catch (exceptation) {
      console.log(exceptation);
      throw exceptation;
    }
  }

  static async getProductById(productId: string): Promise<IProductDetail> {
    try {
      const reponse = await fetch(BASE_URL + "products/" + productId);
      const productDetail = await reponse.json();
      return productDetail as IProductDetail;
    } catch (exceptation) {
      console.log(exceptation);
      throw exceptation;
    }
  }
}

export default ProductService;
