import { createSlice } from "@reduxjs/toolkit";

// Initial state for cart
const initialState = {
  items: [], // each item: { productId, title, price, quantity, thumbnail }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(
        (item) => item.productId === product.id,
      );

      if (existing) {
        existing.quantity += product.quantity ?? 1; // default +1
        if (existing.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== product.id,
          );
        }
      } else {
        state.items.push({
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.image,
          quantity: product.quantity ?? 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.productId !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
