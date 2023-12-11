import React, { useState, useEffect } from 'react';
import { client } from '../../tina/__generated__/client';
import ProductCard from "./ProductCard";

// TypeScript interface for a product
interface Product {
  productName: string;
  productDescription: string;
  imageUrls: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
  };
  minOrder: number;
  types: string[];
  availableSizes: string[];
  isBestSeller: boolean;
  slug: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // function parseContent(content) {
  //   if (content.type === 'text') {
  //     return content.text;
  //   } else if (content.type === 'p') {
  //     return content.children.map(parseContent);
  //   } else {
  //     return null;
  //   }
  // }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await client.queries.productConnection();
        const products = productsResponse.data.productConnection.edges.map((edge) => edge.node);
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6 min-h-[12rem] w-full"
    >
      {products.map((product, index) => (
        <ProductCard key={index} href={product.slug} title={product.productName} desc={product.productDescription} image={product.imageUrls.image1} />
      ))}
    </div>
  );
};

export default ProductsList;