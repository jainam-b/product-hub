import React from "react";
import Image from "next/image";

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
        className="object-cover"
      />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductItem;
