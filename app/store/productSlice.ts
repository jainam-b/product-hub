// src/store/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = Record<string, any>;

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false; // Set loading to false when products are set
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Manage loading state
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload; // Manage error state
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((_, index) => index !== action.payload);
    },
  },
});

export const { setProducts, setLoading, setError, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
