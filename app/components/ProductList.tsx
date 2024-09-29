"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../store/productSlice";
import { setCategories } from "../store/categorySlice";
import { RootState, AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
  rating: number;
}

interface Category {
  name: string;
  slug: string;
  url: string;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchProducts = useCallback(
    async (categorySlug?: string, search?: string) => {
      dispatch(setLoading(true));

      try {
        let url = "https://dummyjson.com/products";

        if (search) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
            search
          )}`;
        } else if (categorySlug) {
          url += `/category/${categorySlug}`;
        }

        url += url.includes("?") ? "&limit=100" : "?limit=100";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        dispatch(setError("Failed to fetch products. Please try again later."));
        console.error("Failed to fetch products:", error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      const formattedCategories: Category[] = data.map(
        (category: string | Category) => {
          if (typeof category === "string") {
            return {
              name: category.charAt(0).toUpperCase() + category.slice(1),
              slug: category.toLowerCase(),
              url: `/category/${category.toLowerCase()}`,
            };
          } else {
            return {
              name: category.name || category.slug,
              slug: category.slug || category.name.toLowerCase(),
              url: `/category/${category.slug || category.name.toLowerCase()}`,
            };
          }
        }
      );

      dispatch(setCategories(formattedCategories));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");
    setSelectedCategory(category);
    setSearchTerm(search || "");
    fetchCategories();
    fetchProducts(category || undefined, search || undefined);
  }, [fetchCategories, fetchProducts]);

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchTerm("");
    router.push(`?category=${categorySlug}`);
    fetchProducts(categorySlug);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setSelectedCategory(null);
    router.push(`?search=${encodeURIComponent(term)}`);
    fetchProducts(undefined, term);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading && <div className="text-center mb-4">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
