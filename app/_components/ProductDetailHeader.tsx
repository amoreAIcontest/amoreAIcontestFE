import Image from 'next/image';
import StatCard from './StatCard';

interface ProductDetailHeaderProps {
  title: string;
  categoryName?: string;
  subcategoryName?: string;
  thumbnailUrl?: string;
  soldCount?: string;
  likedCount?: string;
  reviewCount?: string;
  rating?: number;
}

export default function ProductDetailHeader({ 
  title, 
  categoryName, 
  subcategoryName,
  thumbnailUrl,
  soldCount,
  likedCount,
  reviewCount,
  rating,
}: ProductDetailHeaderProps) {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-8">
      {categoryName && (
        <div className="inline-flex justify-start items-center gap-1">
          <div className="justify-start text-zinc-600 text-xl font-semibold font-['Pretendard'] leading-8">
            {categoryName}
          </div>
          {subcategoryName && (
            <>
              <div className="w-6 h-6 relative shrink-0">
                <Image
                  src="/icons/detail-icon/right.svg"
                  alt=">"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <div className="justify-start text-zinc-600 text-xl font-semibold font-['Pretendard'] leading-8">
                {subcategoryName}
              </div>
            </>
          )}
        </div>
      )}
      <div className="self-stretch inline-flex justify-start items-center gap-9">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title}
            width={384}
            height={384}
            className="w-96 h-96 object-cover"
          />
        )}
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-zinc-900 text-3xl font-bold font-['Pretendard'] leading-10">
            {title}
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-4 flex-wrap content-start">
            <StatCard label="판매 개수" value={soldCount || "0"} icon="sell" />
            <StatCard label="좋아요 개수" value={likedCount || "0"} icon="heart" />
            <StatCard label="리뷰 개수" value={reviewCount || "0"} icon="message" />
            <StatCard label="평균 평점" value={rating?.toFixed(1) || "0"} icon="star" />
          </div>
        </div>
      </div>
    </div>
  );
}

