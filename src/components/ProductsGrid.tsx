import { useState, useEffect } from 'react';
import { client } from '../../tina/__generated__/client';
import ProductCard from "./ProductCard";

// TypeScript interface for a product
interface Product {
  category: Array<string>;
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryMapping = {
    "food": "Food Packaging",
    "retail": "Retail and Gifts",
    "marketing": "Marketing Materials",
    "office": "Office Supplies",
    "speciality": "Speciality",
    "misc": "Misc"
  };

  const handleCategoryChange = (label: string, isChecked: boolean) => {
    const category = categoryMapping[label];
    setSelectedCategories(prev => {
      if (isChecked) {
        return [...prev, category];
      } else {
        return prev.filter(cat => cat !== category);
      }
    });
  };

  useEffect(() => {
    try {
      const filtered = products.filter(product =>
        selectedCategories.length === 0 ||
        product.category.some(cat => selectedCategories.includes(cat))
      );
      setFilteredProducts(filtered);
    }
    catch { console.error("Error filtering:", error); }

  }, [products, selectedCategories]);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const productsResponse = await client.queries.productConnection();
        const products = productsResponse.data.productConnection.edges.map((edge) => edge.node);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryLabels = Object.keys(categoryMapping);
  const categoryCheckboxes = categoryLabels.map((label, index) => (
    <input key={index} id={label} onChange={(e) => handleCategoryChange(label, e.target.checked)} type="checkbox" aria-label={label.charAt(0).toUpperCase() + label.slice(1)} className="btn btn-ghost btn-accent btn-sm font-medium w-fit" />
  ));

  if (error) {
    return
    <div className='w-[100%] grid place-items-center h-[367px]'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  return (
    <>
      <div className="sm:hidden sticky top-0 flex overflow-auto px-4 py-8 gap-4 outline outline-1 outline-gray-300 backdrop-blur-2xl z-30">
        {categoryCheckboxes}
      </div>
      <div className="search-results-container flex p-2 md:px-12 md:py-8">
        <aside
          className="hidden sm:flex flex-col sticky top-28 flex-shrink-0 overflow-x-hidden overflow-y-auto min-w-fit lg:min-w-[256px] max-w-lg h-fit py-6 pr-6 gap-1"
        >
          <p className='text-xl font-medium mb-2'>Categories</p>
          {categoryCheckboxes}
        </aside>
        {isLoading &&
          <span className="loading loading-spinner loading-lg"></span>
        }
        <div className={` ${isLoading && "invisible"} grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6 min-h-[12rem] w-full`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} href={product.slug} title={product.productName} desc={product.productDescription} image={product.imageUrls.image1} />
          ))}
        </div>
      </div>
    </>
  );

};

export default ProductsList;