import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState:{
        cart: null,

    },
    reducers:{
            setCart(state, action){
            //can never be async function
            console.log(state, state.cart)
            console.log(action)  //{type: "cart/setCart", payload: data}
        }
    }
})

export const {setCart} = CartSlice.actions
export default CartSlice.reducer