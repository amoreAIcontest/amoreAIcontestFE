'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReviewCard, { type ReviewData } from './ReviewCard';

interface ReviewSectionProps {
  reviews: ReviewData[];
}

type SentimentFilter = '전체' | '긍정' | '중립' | '부정';
type KeywordFilter = '전체' | '수분' | '향기' | '가격' | '사용감' | '키워드 01' | '키워드 02';

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentFilter>('전체');
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordFilter>('전체');
  const [sortOrder, setSortOrder] = useState<'rating' | 'date'>('rating');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const sentimentFilters: SentimentFilter[] = ['전체', '긍정', '중립', '부정'];
  const keywordFilters: KeywordFilter[] = ['전체', '수분', '향기', '가격', '사용감', '키워드 01', '키워드 02'];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'rating') {
      return b.rating - a.rating;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleSortSelect = (order: 'rating' | 'date') => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-[773px] h-[540px] relative bg-neutral-100 rounded-3xl overflow-hidden">
      <div className="w-[773px] p-6 left-0 top-0 absolute bg-neutral-100 inline-flex flex-col justify-start items-start gap-5">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6">
            리뷰 모아보기
          </div>
          <div className="flex justify-start items-center">
            {sentimentFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedSentiment(filter)}
                className={`px-5 py-2 flex justify-center items-center gap-2.5 ${
                  selectedSentiment === filter ? 'border-b-2 border-zinc-900' : ''
                }`}
              >
                <div
                  className={`justify-start text-sm font-['Pretendard'] leading-5 ${
                    selectedSentiment === filter
                      ? 'text-zinc-900 font-semibold'
                      : 'text-zinc-500 font-medium'
                  }`}
                >
                  {filter}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            {keywordFilters.map((keyword) => (
              <button
                key={keyword}
                onClick={() => setSelectedKeyword(keyword)}
                className={`px-4 py-2 rounded-[60px] inline-flex flex-col justify-start items-start gap-2.5 ${
                  selectedKeyword === keyword ? 'bg-emerald-400' : 'bg-white'
                }`}
              >
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div
                    className={`text-center text-base font-['Pretendard'] leading-6 ${
                      selectedKeyword === keyword
                        ? 'text-white font-bold'
                        : 'text-zinc-600 font-semibold'
                    }`}
                  >
                    {keyword}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-start items-center gap-1 cursor-pointer"
            >
              <div className="justify-start text-zinc-500 text-sm font-medium font-['Pretendard'] leading-5">
                {sortOrder === 'rating' ? '평점순' : '최신순'}
              </div>
              <div className={`w-5 h-5 relative overflow-hidden transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <Image
                  src="/icons/detail-icon/downGrey.svg"
                  alt="정렬"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-[77px] inline-flex flex-col justify-start items-start z-10">
                <button
                  onClick={() => handleSortSelect('rating')}
                  className={`px-5 py-2.5 bg-white rounded-tl-lg rounded-tr-lg shadow-[8px_0px_8px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-center gap-2.5 ${
                    sortOrder === 'rating' ? 'bg-neutral-100' : 'hover:bg-neutral-100'
                  }`}
                >
                  <div className={`justify-start text-sm font-normal font-['Pretendard'] leading-5 ${
                    sortOrder === 'rating' ? 'text-stone-950' : 'text-zinc-500'
                  }`}>
                    평점순
                  </div>
                </button>
                <button
                  onClick={() => handleSortSelect('date')}
                  className={`px-5 py-2.5 bg-white rounded-bl-lg rounded-br-lg shadow-[8px_8px_8px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-center gap-2.5 ${
                    sortOrder === 'date' ? 'bg-neutral-100' : 'hover:bg-neutral-100'
                  }`}
                >
                  <div className={`justify-start text-sm font-normal font-['Pretendard'] leading-5 ${
                    sortOrder === 'date' ? 'text-stone-950' : 'text-zinc-500'
                  }`}>
                    최신순
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[725px] left-[24px] top-[145px] absolute inline-flex flex-col justify-start items-start gap-5 overflow-y-auto max-h-[395px]">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

