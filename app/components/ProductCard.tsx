import ImageComponent from './ImageComponent';

interface ProductCardProps {
  imageUrl: string;
  title: string;
}

export default function ProductCard({ imageUrl, title }: ProductCardProps) {
  return <ImageComponent imageUrl={imageUrl} title={title} />;
}

