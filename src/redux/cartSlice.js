// import { createSlice } from "@reduxjs/toolkit";
// Initial state for cart
// const initialState = {
//   items: [], // each item: { productId, title, price, quantity, thumbnail }
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existing = state.items.find(
//         (item) => item.productId === product.id,
//       );

//       if (existing) {
//         existing.quantity += product.quantity ?? 1; // default +1
//         if (existing.quantity <= 0) {
//           state.items = state.items.filter(
//             (item) => item.productId !== product.id,
//           );
//         }
//       } else {
//         state.items.push({
//           productId: product.id,
//           title: product.title,
//           price: product.price,
//           thumbnail: product.thumbnail || product.image,
//           quantity: product.quantity ?? 1,
//         });
//       }
//     },
//     removeFromCart: (state, action) => {
//       const id = action.payload;
//       state.items = state.items.filter((item) => item.productId !== id);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.productId === item.productId,
      );
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // <-- persist
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
