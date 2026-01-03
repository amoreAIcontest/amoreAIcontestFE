export interface RatingData {
  rating: number; 
  percentage: number; 
}

interface RatingDistributionProps {
  ratings: RatingData[];
}

export default function RatingDistribution({ ratings }: RatingDistributionProps) {
  const sortedRatings = [...ratings].sort((a, b) => b.rating - a.rating);

  return (
    <div className="w-96 p-6 bg-neutral-100 rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="self-stretch justify-start text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6">
          평균 평점 비율
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          {sortedRatings.map((ratingData) => (
            <div key={ratingData.rating} className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-zinc-800 text-sm font-semibold font-['Pretendard'] leading-5">
                  {ratingData.rating}점
                </div>
                <div className="text-right justify-start text-zinc-600 text-sm font-medium font-['Pretendard'] leading-5">
                  {ratingData.percentage}%
                </div>
              </div>
              <div className="self-stretch h-1.5 bg-white rounded flex flex-col justify-start items-start gap-2.5">
                <div
                  className="h-1.5 bg-blue-500 rounded"
                  style={{ width: `${ratingData.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

