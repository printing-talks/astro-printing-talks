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
    <a href={`products/${href}`} className={`inline-block bg-base-100 shadow-md hover:shadow-lg rounded-lg transition duration-100 min-h-[360px] min-w-[250px] max-w- [600px] cursor-pointer overflow-hidden flex-shrink-0 ${className}`}>
      <img loading="lazy" src={image} alt={title} className='bg-base-300 w-full object-cover h-[256px]' />
      <div className='flex flex-col gap-2 px-8 py-6'>
        <h4>{title}</h4>
        <p className='line-clamp-2' >{desc}</p>
      </div>
    </a>
  );
};

export default ProductCard;
