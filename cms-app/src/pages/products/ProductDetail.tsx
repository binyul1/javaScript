import { useParams } from "react-router";
import { useProduct } from "../../lib/hook/product-hook";
import { useEffect } from "react";
import SingleProductDetail from "../../components/products/SingleProductDetail";

export interface IproductDimensionAttribute{
    width: number;
    height: number;
    depth: number;
}
export interface IProductReview{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}
export interface IProduceMetaAttribute{
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface IProductDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  sku: string;
  weight: number;
  dimensions: IproductDimensionAttribute;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<IProductReview>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProduceMetaAttribute;
  images: Array<string>;
  thumbnail: string;
}

export default function ProductDetail() {
  // product param
  const params = useParams() as { productId: string };
  const{detail, getProductDetail} = useProduct()

  useEffect(() =>{
    getProductDetail(params.productId)
  },[params, getProductDetail])
  return (<>{
    detail ? <> <SingleProductDetail product = {detail}/> </> : <>Loading...</>
  }
    
  </>);
}
