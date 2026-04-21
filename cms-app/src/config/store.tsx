import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../lib/reducers/card.reducer"

const store = configureStore({
    reducer:{
        //combine reducers here
        cart: CartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;