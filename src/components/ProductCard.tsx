interface ProductCardProps {
  image?: string;
  title?: string;
  desc?: string;
  href?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image = 'https://placehold.co/600x400', // Replace with actual default image URL
  title = 'Default Title',
  desc = 'Default description',
  href = '/',
  className = '',
}) => {
  return (
    <>
      <style>
        {`
          .image-scale {
            transition: transform 0.4s ease;
          }
          .product-card:hover .image-scale{
            transform: scale(1.1);
          }
        `}
      </style>
      <a href={`products/${href}`} className={`product-card inline-block bg-base-100 shadow-md hover:shadow-xl rounded-lg transition duration-400 min-h-[360px] max-w-[600px] cursor-pointer overflow-hidden flex-shrink-0 ${className}`}>
        <img loading="lazy" src={image} alt={title} className='bg-base-300 w-full object-cover h-[256px] image-scale' />
        <div className='flex flex-col gap-2 px-8 py-6'>
          <h4>{title}</h4>
          <p className='line-clamp-2' >{desc}</p>
        </div>
      </a>
    </>
  );
};

export default ProductCard;
