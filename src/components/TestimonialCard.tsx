import React from 'react';

interface TestimonialCardProps {
  author?: string;
  companyLogo?: string;
  testimonialText?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author = 'Anonymous',
  companyLogo = '/images/no-image.png', // Replace with a path to your default logo
  testimonialText = 'No testimonial text provided.'
}) => {
  return (
    <div className="p-6 min-h-[504px] min-w-[256px] max-w-lg bg-white shadow-lg rounded-lg relative">
      {/* Quotation Mark */}
      <div className="absolute -top-3 -left-3 text-4xl text-neutral">&ldquo;</div>

      {/* Company Logo */}
      <img src={companyLogo} alt={`${author}'s company logo`} className="h-10 mb-4" />

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 italic mb-4">{testimonialText}</blockquote>

      {/* Author */}
      <footer className="font-semibold">{author}</footer>
    </div>
  );
};

export default TestimonialCard;
