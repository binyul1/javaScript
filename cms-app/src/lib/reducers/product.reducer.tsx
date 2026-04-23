import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/apiClient";
import type { IProductDetail } from "../../pages/products/ProductDetail";

// async redux management

interface IPaginationProps{
    limit?: number,
    skip?: number,
}
//redux middleware
//thunk, saga
export const getAllProducts = createAsyncThunk("product/getAllProduct",
    async(payload:IPaginationProps = {limit:198, skip:0}) => {
        const response = await axiosInstance.get('/products',{
            params: {
              limit: payload.limit,
              skip: payload.skip,
            }
    });
    console.log({response})
    return response as unknown as { products: Array<IProductDetail>, skip: number, limit: number };
}
)

const ProductSlice = createSlice({
    name: "product",
    initialState:{
        allProducts: null,
    } as { allProducts: Array<IProductDetail> | null },
    reducers:{
            // hello(state, action){
            // //can never be async function
            // console.log(state, state.allProducts)
            // console.log(action)  //{type: "product/hello", payload: data}
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.fulfilled, (state,action)=>{
            state.allProducts = action.payload.products
        });
        builder.addCase(getAllProducts.rejected, (state)=>{
            state.allProducts = null
        });
    }
});

// export const {hello} = ProductSlice.actions
export default ProductSlice.reducer