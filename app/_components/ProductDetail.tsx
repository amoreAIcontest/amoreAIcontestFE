import Image from 'next/image';

interface StatCardProps {
  label: string;
  value: string;
  icon: 'sell' | 'heart' | 'message' | 'star';
}

function StatCard({ label, value, icon }: StatCardProps) {
  const iconPath = `/icons/detail-icon/${icon}.svg`;
  
  return (
    <div className="w-96 h-36 p-5 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="w-80 inline-flex justify-between items-start">
        <div className="w-24 inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-zinc-600 text-lg font-medium font-['Pretendard'] leading-7">
            {label}
          </div>
          <div className="self-stretch justify-start text-zinc-900 text-4xl font-semibold font-['Pretendard'] leading-[60px]">
            {value}
          </div>
        </div>
        <div className="w-16 h-16 p-3 bg-emerald-50 rounded-[60px] flex justify-center items-center gap-2.5">
          <div className="w-10 h-10 relative shrink-0">
            <Image
              src={iconPath}
              alt={label}
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailProps {
  title: string;
}

export default function ProductDetail({ title }: ProductDetailProps) {
  return (
    <div className="self-stretch inline-flex justify-start items-center gap-9">
      <Image
        src="/dummyImageDetail.png"
        alt={title}
        width={384}
        height={384}
        className="w-96 h-96 object-cover"
      />
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch justify-start text-zinc-900 text-3xl font-bold font-['Pretendard'] leading-10">
          {title}
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-4 flex-wrap content-start">
          <StatCard label="판매 개수" value="4.7M" icon="sell" />
          <StatCard label="좋아요 개수" value="4.7K" icon="heart" />
          <StatCard label="리뷰 개수" value="4.7M" icon="message" />
          <StatCard label="평균 평점" value="4.7" icon="star" />
        </div>
      </div>
    </div>
  );
}

