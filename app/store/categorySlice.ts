// store/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a single category
interface Category {
  slug: string; // Unique identifier for the category
  name: string; // Display name of the category
  url: string;  // API URL to fetch products for this category
}

// Define the initial state structure for categories
interface CategoryState {
  categories: Category[]; // Array to hold the list of categories
}

// Initial state with an empty categories array
const initialState: CategoryState = {
  categories: [],
};

// Create a slice for categories with initial state and reducers
const categorySlice = createSlice({
  name: 'categories', // Name of the slice
  initialState,
  reducers: {
    // Reducer to set categories in the state
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload; // Update the categories in the state
    },
  },
});

// Export the action creator for setting categories
export const { setCategories } = categorySlice.actions;

// Export the reducer to be included in the store
export default categorySlice.reducer;
