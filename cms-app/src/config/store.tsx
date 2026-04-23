import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../lib/reducers/card.reducer"
import ProductReducer from "../lib/reducers/product.reducer";
import UserReducer from "../lib/reducers/user.reducer";

const store = configureStore({
    reducer:{
        //combine reducers here
        cart: CartReducer,
        product: ProductReducer,
        user: UserReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;