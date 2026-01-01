import Link from 'next/link';
import ImageComponent from './ImageComponent';

interface ProductCardProps {
  productId: number;
  imageUrl: string;
  title: string;
}

export default function ProductCard({ productId, imageUrl, title }: ProductCardProps) {
  return (
    <Link href={`/detail?id=${productId}`}>
      <ImageComponent imageUrl={imageUrl} title={title} />
    </Link>
  );
}

