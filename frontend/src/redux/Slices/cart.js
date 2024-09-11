

import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
const initialState = {
  totalItems:localStorage.getItem('totalItems')?JSON.parse(localStorage.getItem('totalItems')):0,
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  
  
};

const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },

    //addto cart
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({...action.payload, quantity: 1 });
      }
      localStorage.setItem('totalItems', JSON.stringify(state.items.length));
    },

    //remove
    removeItem(state, action) {
      const updatedItems = state.items.filter((item) => item._id!== action.payload);
      state.items = updatedItems;
      localStorage.setItem('totalItems', JSON.stringify(updatedItems.length));
    },
    //reset all
    resetCart(state) {
      state.items = [];
      localStorage.removeItem('totalItems');
      localStorage.removeItem('cartItems');
    },
    //update quantity
    updateQuantity(state, action) {
      const updatedItems = state.items.map((item) =>
        item._id === action.payload._id? {...item, quantity: action.payload.quantity } : item
      );
      state.items = updatedItems;
      localStorage.setItem('totalItems', JSON.stringify(updatedItems.length));
    },
    //loading
    setLoading(state, action) {
      state.loading = action.payload;
    },
    //error
    setError(state, action) {
      state.error = action.payload;
    },
    //clear error
    clearError(state) {
      state.error = null;
    },
    
  },
});

export const { setToken,resetCart } = cartSlice.actions;

export default cartSlice.reducer;
