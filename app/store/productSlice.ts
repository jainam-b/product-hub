// store/productSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// store/productSlice.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  thumbnail: string;
}


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
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
