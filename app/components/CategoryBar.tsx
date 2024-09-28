// components/CategoryBar.tsx

import React from 'react';

interface Category {
  name: string;
  slug: string;
}

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (categorySlug: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button
        className={`px-4 py-2 rounded transition ${
          selectedCategory === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onCategoryClick('')}
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
          onClick={() => onCategoryClick(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
