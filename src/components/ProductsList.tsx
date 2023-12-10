import React, { useState, useEffect } from 'react';
import { client } from '../../tina/__generated__/client';

// TypeScript interface for a product
interface Product {
  productName: string;
  productDescription: string;
  // Add other fields as needed
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `
      productConnection {
        edges {
          node {
            slug
            productName
            productDescription
            imageUrls {
              image1
              image2
              image3
              image4
            }
            minOrder
            types
            availableSizes
            isBestSeller
          }
        }
      }
      `;

      try {
        const response = await client.request(query);
        setProducts(response.getProductsList.edges.map(edge => edge.node.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h2>{product.productName}</h2>
          <p>{product.productDescription}</p>
          {/* Render other details */}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
