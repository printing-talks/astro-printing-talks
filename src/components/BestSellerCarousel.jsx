// BestSellerCarousel.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import fetchBestSellers from '../fetchBestSellers';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const BestSellerCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchBestSellers();
        console.log('Fetched Products Inside useEffect:', fetchedProducts); // Debugging

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error('Fetched data is not an array:', fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching best-selling products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div id="best-sellers-carousel" className="carousel-container">
      {products.length > 0 ? (
        <Swiper
          // Add Swiper configurations here
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
              slidesPerView: 4.2,
            },
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                title={product.productName}
                desc={product.productDescription}
                image={product.imageUrls?.image1}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No best selling products found.</p>
      )}
    </div>
  );
};

export default BestSellerCarousel;
