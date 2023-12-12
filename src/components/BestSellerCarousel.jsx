import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { client } from "../../tina/__generated__/client";

const fetchBestSellers = async () => {
  try {
    const filter = {
      isBestSeller: { eq: true } // Adjusted filter structure
    };

    const productsResponse = await client.queries.productConnection({ filter });
    const products = productsResponse.data.productConnection.edges.map(
      (edge) => edge.node,
    );
    console.log(products);
    return products; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
};

const BestSellerCarousel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchBestSellers();
        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error('Fetched data is not an array:', fetchedProducts);
          setError('Invalid data format.');
        }
      } catch (error) {
        console.error('Error fetching best-selling products:', error);
        setError('Failed to fetch products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return <div className='w-[100%] grid place-items-center h-[367px]'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="best-sellers-carousel" className="carousel-container">
      {products.length > 0 ? (
        <Swiper
          slidesOffsetBefore={96}
          spaceBetween={24}
          slidesPerView={1.3} // Default number of slides per view
          breakpoints={{
            // When window width is >= 640px
            640: {
              slidesPerView: 2.2,
            },
            // When window width is >= 768px
            768: {
              slidesPerView: 3.2,
            },
            // When window width is >= 1024px
            1024: {
              slidesPerView: 4.5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                title={product.productName}
                desc={product.productDescription}
                image={product.imageUrls?.image1}
                href={product.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='w-[100%] grid place-items-center h-[367px]'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default BestSellerCarousel;
