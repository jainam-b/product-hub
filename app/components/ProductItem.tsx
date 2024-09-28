// components/ProductItem.tsx

import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  thumbnail: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div key={product.id} className="border p-4 rounded shadow-md hover:shadow-lg transition">
      <img className="h-40 w-full object-cover rounded-md mb-2" src={product.thumbnail} alt={product.title} />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-700 line-clamp-2">{product.description}</p>
      <p className="font-bold text-lg">Price: ${product.price?.toFixed(2)}</p>
      <p className="text-gray-500">Category: {product.category}</p>
      <p className="text-gray-500">Stock: {product.stock}</p>
      <p className="text-gray-500">Rating: {product.rating?.toFixed(1)} ⭐</p>
    </div>
  );
};

export default ProductItem;
