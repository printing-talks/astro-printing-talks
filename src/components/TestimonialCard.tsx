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
    <div className="flex flex-col p-6 min-h-[504px] min-w-[256px] max-w-lg bg-white shadow-lg rounded-lg relative">
      {/* Quotation Mark */}
      <div className="absolute -top-3 -left-3 text-4xl text-neutral">&ldquo;</div>

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
