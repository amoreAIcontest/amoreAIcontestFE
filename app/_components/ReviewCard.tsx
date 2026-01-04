import Image from 'next/image';

export interface ReviewData {
  id: string;
  username: string;
  profileImage: string;
  rating: number; // 1-5
  date: string;
  packaging?: string;
  beautyProfile?: string;
  photos?: string[];
  sellerResponse?: string;
}

interface ReviewCardProps {
  review: ReviewData;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { username, rating, date, packaging, beautyProfile, photos = [], sellerResponse } = review;

  return (
    <div className="self-stretch p-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex justify-start items-center gap-3">
              <Image
                src="/icons/home-icon/userDefault.svg"
                alt={username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-zinc-900 text-xs font-semibold font-['Pretendard'] leading-4">
                  {username}
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-4 h-4 relative overflow-hidden">
                      {index < rating ? (
                        <Image
                          src="/icons/detail-icon/fullStar.svg"
                          alt="filled star"
                          width={16}
                          height={16}
                          className="w-full h-full"
                        />
                      ) : (
                        <Image
                          src="/icons/detail-icon/emptyStar.svg"
                          alt="empty star"
                          width={16}
                          height={16}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="justify-start text-zinc-500 text-xs font-medium font-['Pretendard'] leading-4">
              {date}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              {packaging && (
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-xs font-medium font-['Pretendard'] leading-4 shrink-0">
                    Packaging:
                  </div>
                  <div className="flex-1 justify-start text-zinc-900 text-xs font-normal font-['Pretendard'] leading-4">
                    {packaging}
                  </div>
                </div>
              )}
              {beautyProfile && (
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-xs font-medium font-['Pretendard'] leading-4 shrink-0">
                    Beauty Profile:
                  </div>
                  <div className="flex-1 justify-start text-zinc-900 text-xs font-normal font-['Pretendard'] leading-4">
                    {beautyProfile}
                  </div>
                </div>
              )}
            </div>
            {photos.length > 0 && (
              <div className="inline-flex justify-start items-center gap-2">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-lg overflow-hidden relative"
                  >
                    <Image
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {sellerResponse && (
          <div className="self-stretch p-3 bg-neutral-100 rounded-xl flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="px-3 py-1 bg-white rounded-[60px] flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="text-center justify-start text-zinc-600 text-sm font-semibold font-['Pretendard'] leading-5">
                    Seller&apos;s Response
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start text-zinc-900 text-xs font-normal font-['Pretendard'] leading-4">
                {sellerResponse}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

