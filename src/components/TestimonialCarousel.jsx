import { useState, useEffect } from 'react';
import { client } from "../../tina/__generated__/client";
import TestimonialCard from './TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const fetchTestimonials = async () => {
  try {
    const testimonialsResponse = await client.queries.testimonialConnection();
    const testimonials = testimonialsResponse.data.testimonialConnection.edges.map(
      (edge) => edge.node,
    );
    console.log(testimonials);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
};

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchTestimonials();
        if (Array.isArray(fetchedProducts)) {
          setTestimonials(fetchedProducts);
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
    <div id="testimonial-carousel" className="carousel-container py-6">
      {console.log(testimonials)}
      {testimonials.length > 0 ? (
        <Swiper
          slidesOffsetBefore={16}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesOffsetBefore: 96 },
            780: {
              slidesPerView: 2.2,
              slidesOffsetBefore: 96
            },
            1200: {
              slidesPerView: 3.2,
              slidesOffsetBefore: 96
            },
            1600: {
              slidesPerView: 4.2,
              slidesOffsetBefore: 96
            },
            1800: {
              slidesPerView: 5.2,
              slidesOffsetBefore: 96
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide className='pb-6' key={index}>
              <TestimonialCard
                author={testimonial.author}
                testimonialText={testimonial.testimonialText}
                {...(testimonial.companyLogo && { companyLogo: testimonial.companyLogo })}
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

export default TestimonialCarousel;
