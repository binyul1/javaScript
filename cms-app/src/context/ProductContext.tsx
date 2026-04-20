import { createContext } from "react";
import type { IProductDetail } from "../pages/products/ProductDetail";

export interface IProduceContext {
    detail: undefined | IProductDetail;

    getProductDetail(productId: string) : Promise<void | IProductDetail>;
}

const ProductContext = createContext(
    {
        detail:undefined,
        async getProductDetail(){}
    })

export default ProductContext