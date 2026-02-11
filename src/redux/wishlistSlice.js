import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.error("Could not save wishlist", error);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishList = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },

    toggleWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }

      saveWishlistToStorage(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishList.actions;

export default wishList.reducer;
