import React from 'react';

interface ProductCardProps {
  image?: string;
  title?: string;
  desc?: string;
  href?: string;
}


const ProductCard: React.FC<ProductCardProps> = ({
  image = 'https://placehold.co/600x400', // Replace with actual default image URL
  title = 'Default Title',
  desc = 'Default description',
  href = '/',
}) => {
  return (
    <a href={`products/${href}`} className='bg-base-100 shadow-md hover:shadow-lg rounded-lg transition duration-100 min-h-[360px] max-w-[400px] cursor-pointer overflow-hidden'>
      <img src={image} alt={title} className='bg-base-300 w-full object-cover h-[216px]' />
      <div className='px-6 py-4'>
        <h4>{title}</h4>
        <p className='line-clamp-2' >{desc}</p>
      </div>
    </a>
  );
};

export default ProductCard;
