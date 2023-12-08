import React from 'react';

interface ProductCardProps {
  image?: string;
  title?: string;
  desc?: string;
  href?: string; // Make the card link somewhere when clicked
}

const ProductCard: React.FC<ProductCardProps> = ({
  image = 'https://placehold.co/600x400', // Replace with actual default image URL
  title = 'Default Title',
  desc = 'Default description',
  href = '/',
}) => {
  return (
    <a href={href} className='bg-base-100 shadow-md hover:shadow-lg rounded-lg transition duration-100 min-h-[360px] max-w-[400px] min-w-[256px] cursor-pointer'>
      <img src={image} alt={title} className='bg-base-300 w-full object-cover h-[216px]' />
      <div className='px-6 py-4'>
        <h3>{title}</h3>
        <p className='line-clamp-2' >{desc} asdasdasdasdasdasdasda</p>
      </div>
    </a>
  );
};

export default ProductCard;
