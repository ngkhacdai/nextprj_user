import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectProduct: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onSelectProduct: (state, action) => {
      state.selectProduct = action.payload;
    },
    onUpdateQuantityInc: (state, action) => {
      const item = state.selectProduct.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (item) {
        item.quantity += 1;
      }
    },
    onUpdateQuantityDec: (state, action) => {
      const item = state.selectProduct.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (item) {
        item.quantity -= 1;
      }
    },
    onRemoveItem: (state, action) => {
      const item = state.selectProduct.find(
        (item) => item.itemId === action.payload.itemId
      );
      if (item) {
        state.selectProduct = state.selectProduct.filter(
          (item) => item.itemId !== action.payload.itemId
        );
      }
    },
  },
});

export const {
  onSelectProduct,
  onUpdateQuantityInc,
  onUpdateQuantityDec,
  onRemoveItem,
} = cartSlice.actions;

export default cartSlice.reducer;
