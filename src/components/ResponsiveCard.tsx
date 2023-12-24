/**
 * ResponsiveCard component based on DaisyUI structure.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - The rendered component.
 * Props:
 *  - `imageUrl` (string): URL of the image to be displayed in the card. 
 *     This should be a valid image source link.
 *  - `title` (string): The title text to be displayed on the card.
 *     This is typically a short, descriptive headline.
 *  - `content` (string): The main content text of the card.
 *     This can be a brief description or any relevant information.
 *  - `buttonText` (string): Text to be displayed on the button.
 *     This could be a call-to-action or any relevant label.
 */
interface ResponsiveCardProps {
  imageUrl: string | null;
  title: string;
  content: string | null;
  buttonText: string;
  slug: string;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ imageUrl, title, content, buttonText, slug }) => {
  const processedImageUrl = imageUrl ?? undefined;
  return (
    <a href={`articles/${slug}`} className="product-card relative flex flex-col bg-base-100 shadow-md hover:shadow-xl rounded-xl transition duration-400 min-h-[256px] cursor-pointer overflow-hidden flex-shrink-0 md:flex-row md:max-h-[256px]">
      <figure className="max-h-[256px] md:max-w-md">
        <img className="w-full h-full max-h-[256px] md:max-h-[999px] object-contain" src={processedImageUrl} alt={title} />
      </figure>
      <div className="flex flex-col p-6 justify-center">
        <h4 className="line-clamp-2">{title}</h4>
        <p className="line-clamp-4">{content}</p>
      </div>
    </a>
  );
};

export default ResponsiveCard;