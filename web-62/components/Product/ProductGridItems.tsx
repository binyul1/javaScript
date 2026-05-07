//server side component
// "use client";
import { BASE_URL } from "@/lib/config/app";
import { SingleProductItem } from "./SingleProductItem";
import type { IProductDetail } from "@/lib/types/product";
import ProductService from "@/lib/service/product-service";
// import { useEffect, useState } from "react";

export const ProductGridItems = async () => {
  //server side fetching
  // const response = await fetch(BASE_URL + "products");
  // const data = await response.json();

  //client side fetching
  // const [data, setData] = useState<{ products:Array<IProductDetail> }>();
  // const getAllProducts = async () => {
  //   const response = await fetch(BASE_URL + "products");
  //   const responseData = await response.json();
  //   setData(responseData);
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const products = await ProductService.getAllProducts();

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased md:py-12">
        <div className="mx-auto w-full px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5">
            {products &&
              products.map((row: IProductDetail, i: number) => {
                return <SingleProductItem key={i} detail={row} />;
              })}
          </div>
          <div className="w-full text-center"></div>
        </div>
      </section>
    </>
  );
};
