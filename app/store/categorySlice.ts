import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
