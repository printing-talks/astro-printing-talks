interface TestimonialCardProps {
  author?: string;
  companyLogo?: string;
  testimonialText?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author = 'Anonymous',
  companyLogo = '/images/default-profile.svg',
  testimonialText = 'No testimonial text provided.'
}) => {
  return (
    <div className="flex flex-col p-6 min-h-[504px] min-w-[364px] max-w-lg bg-white shadow-lg rounded-2xl relative">
      {/* Quotation Mark */}
      <div className="absolute -top-3 -left-3 text-4xl text-neutral">
        <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.6756 0C17.1475 0.369088 18.1042 1.55017 18.5458 3.54325C16.4116 4.72433 14.2405 6.49596 12.0327 8.85813C9.82485 11.2203 8.27937 13.8039 7.39624 16.609H7.72741C10.524 16.609 12.695 17.3472 14.2405 18.8235C15.8596 20.2261 16.6691 22.0715 16.6691 24.3599C16.6691 26.5006 15.8596 28.3091 14.2405 29.7855C12.695 31.2618 10.8184 32 8.61055 32C5.96115 32 3.86371 31.0773 2.31822 29.2318C0.772741 27.3126 0 25.0242 0 22.3668C0 17.8639 1.43509 13.8408 4.30527 10.2976C7.17545 6.75432 10.9656 3.3218 15.6756 0Z" fill="#8D313E" />
          <path d="M37.1557 3.54325C36.7141 1.55017 35.7574 0.369088 34.2855 0C29.5755 3.3218 25.7854 6.75432 22.9152 10.2976C20.045 13.8408 18.6099 17.8639 18.6099 22.3668C18.6099 25.0242 19.3827 27.3126 20.9282 29.2318C22.4736 31.0773 24.5711 32 27.2205 32C29.4283 32 31.305 31.2618 32.8504 29.7855C34.4695 28.3091 35.2791 26.5006 35.2791 24.3599C35.2791 22.0715 34.4695 20.2261 32.8504 18.8235C31.305 17.3472 29.1339 16.609 26.3373 16.609H26.0062C26.8893 13.8039 28.4348 11.2203 30.6426 8.85813C32.8504 6.49596 35.0215 4.72433 37.1557 3.54325Z" fill="#8D313E" />
        </svg>
      </div>

      {/* Company Logo */}
      <div className="image-container">
        <img src={companyLogo} alt={`${author}'s company logo`} className="h-[96px] mb-8" />
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 italic mb-4 flex-grow">{testimonialText}</blockquote>

      {/* Author */}
      <footer className="font-semibold">{author}</footer>
    </div>
  );
};

export default TestimonialCard;
