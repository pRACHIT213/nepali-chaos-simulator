
interface PlaceholderImageProps {
  name: string;
  className?: string;
}

const PlaceholderImage = ({ name, className = "" }: PlaceholderImageProps) => {
  return (
    <div className={`bg-chaos-dark flex items-center justify-center text-center p-2 ${className}`}>
      <span className="text-chaos-light font-bold">{name}</span>
    </div>
  );
};

export default PlaceholderImage;
