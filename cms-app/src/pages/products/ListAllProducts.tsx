import { NavLink } from "react-router";
import { PageTitle } from "../../components/page-title/PageTitle";
import { useEffect, useState } from "react";
import { IoGridSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { FaThList } from "react-icons/fa";

//data
import SingleProductGridItem from "../../components/products/SingleProductGridItem";
import SingleProductSkeleton from "../../components/products/SingleProductSkeleton";
import axiosInstance from "../../config/apiClient";
import type { IProductDetail } from "./ProductDetail";



export interface IProductListResponse{
  limit: number, 
  products: Array<IProductDetail>,
  skip:number,
  total: number,
}

export default function ListAllProducts() {
  const [viewType, setViewType] = useState<string>("grid");

  const [loading, setloading] = useState<boolean>(true);
  const [products, setProducts] = useState<Array<IProductDetail>>();



  const getAllProducts = async() => {
    //api caller
    try {
      const response = await axiosInstance.get('/products',{
        params: {
          limit: 40,
          skip:0,
          select:"id,title,description,category,price,discountPercentage,rating,brand,thumbnail" 
        }
      }) as IProductListResponse
      setloading(false)
      setProducts(response.products)
      console.log(response)
    } catch (exceptation) {
      console.log(exceptation)
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  return (
    <section className="bg-gray-100 flex flex-col gap-5 p-5">
      <div className="flex w-full justify-between">
        <PageTitle className="text-teal-900">All Product Lists</PageTitle>
        <div className="flex gap-2 w-1/3">
          <input
            type="search"
            className="w-2/3 border bg-gray-200 border-gray-200 rounded-md shadow p-2"
            placeholder="Enter your search keyword"
          />
          <NavLink
            to={`/admin/product/create`}
            className="flex w-50 p-2 justify-center items-center bg-emerald-800 text-white text-lg rounded-full transition hover:underline hover:bg-emerald-900 hover:scale-98"
          >
            <LuPlus />
            Add Product
          </NavLink>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-end">
        <span className="size-5" onClick={() => setViewType("grid")}>
          <IoGridSharp className="size-5" />
        </span>
        <span className="size-5" onClick={() => setViewType("list")}>
          <FaThList className="size-5" />
        </span>
      </div>

      <div
        className={`grid ${viewType === "grid" ? "grid-cols-4" : "grid-cols-1"} gap-2 `}
      >
        {loading ? (
          [...Array(12)].map((_, index) => {
            return <SingleProductSkeleton key={index} />;
          })
        ) : products ? (
          products &&
          products.map((prod: IProductDetail, i: number) => {
            return <SingleProductGridItem product={prod} key={i} />;
          })
        ) : (
          <>No Products Found</>
        )}
      </div>
    </section>
  );
}
