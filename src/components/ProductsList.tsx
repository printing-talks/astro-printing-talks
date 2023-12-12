import { useState, useEffect } from 'react';
import { client } from '../../tina/__generated__/client';

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
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function parseContent(content) {
    if (content.type === 'text') {
      return content.text;
    } else if (content.type === 'p') {
      return <p>{content.children.map(parseContent)}</p>;
    } else {
      return null;
    }
  }

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
    <div>
      {products.map((product, index) => (
        <div key={index}> {/* Use index as a last resort if there's no unique field */}
          <h2>{product.productName}</h2>
          {product.productDescription.children.map(parseContent)}
          {/* Render other details */}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;