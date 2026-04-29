import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../lib/reducers/cart.reducer";
import ProductReducer from "../lib/reducers/product.reducer";

const store = configureStore({
  reducer: {
    //combine reducers here
    cart: CartReducer,
    product: ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
