"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../store/productSlice';
import { setCategories } from '../store/categorySlice';
import { RootState, AppDispatch } from '../store/store';

type Product = Record<string, any>;

interface Category {
  name: string;
  slug: string;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchProducts = useCallback(async (categorySlug?: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const url = categorySlug
        ? `https://dummyjson.com/products/category/${categorySlug}?limit=10`
        : 'https://dummyjson.com/products?limit=10';
      const response = await fetch(url);
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
      
      // Check if the data is an array of strings or objects
      const formattedCategories: Category[] = data.map((category: string | Category) => {
        if (typeof category === 'string') {
          return {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            slug: category.toLowerCase()
          };
        } else {
          // Assume it's already in the correct format
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
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    fetchProducts(categorySlug);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      
      {/* Category Bar */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded transition ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryClick('')}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`px-4 py-2 rounded transition ${
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

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
        {products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded shadow-md hover:shadow-lg transition">
            <img className="h-40 w-full object-cover rounded-md mb-2" src={product.thumbnail} alt={product.title} />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700 line-clamp-2">{product.description}</p>
            <p className="font-bold text-lg">Price: ${product.price?.toFixed(2)}</p>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
            <p className="text-gray-500">Rating: {product.rating?.toFixed(1)} ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;