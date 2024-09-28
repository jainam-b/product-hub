// components/ProductList.tsx

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../store/productSlice';
import { setCategories } from '../store/categorySlice';
import { RootState, AppDispatch } from '../store/store';
import { useRouter } from 'next/navigation';
import CategoryBar from './CategoryBar';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import { ProductType } from '../store/productSlice'; // Add this import

type Product = Record<string, any>;

interface Category {
  name: string;
  slug: string;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100'); // Fetch all products
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      dispatch(setProducts(data.products));
    } catch (error) {
      dispatch(setError('Failed to fetch products. Please try again later.'));
      console.error('Failed to fetch products:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();

      const formattedCategories: Category[] = data.map((category: string | Category) => {
        if (typeof category === 'string') {
          return {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            slug: category.toLowerCase()
          };
        } else {
          return {
            name: category.name || category.slug,
            slug: category.slug || category.name.toLowerCase()
          };
        }
      });

      dispatch(setCategories(formattedCategories));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search') || '';
    setSelectedCategory(category);
    setSearchTerm(search);
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    router.push(`?category=${categorySlug}&search=${searchTerm}`);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    router.push(`?category=${selectedCategory || ''}&search=${term}`);
  };

  // Filter products based on the search term only
  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Category Bar */}
      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryClick={handleCategoryClick} 
      />

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mb-4">Loading...</div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
