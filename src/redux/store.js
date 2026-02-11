import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishListReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishListReducer,
  },
});
