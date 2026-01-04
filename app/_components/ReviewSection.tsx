'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import ReviewCard, { type ReviewData } from './ReviewCard';
import { useReviewList } from '@/hooks/useReviewList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ReviewItem, ReviewListResponse } from '@/types/api';

interface ReviewSectionProps {
  productId: number;
  initialData?: ReviewListResponse;
}

type SentimentFilter = '전체' | '긍정' | '중립' | '부정';
type KeywordFilter = '전체' | '수분' | '저자극' | '클렌징' | '질감' | '배송';
function convertReviewItemToReviewData(item: ReviewItem): ReviewData {
  const contentParts = item.content.split('\n').filter(Boolean);
  const packaging = contentParts.find(part => part.toLowerCase().includes('packaging')) || '';
  const beautyProfile = contentParts.find(part => part.toLowerCase().includes('beauty') || part.toLowerCase().includes('profile')) || item.content;

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const filteredPhotos = (item.review_media || []).filter((url) => {
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext));
  });

  return {
    id: item.review_id.toString(),
    username: item.author,
    profileImage: '/icons/home-icon/userDefault.svg',
    rating: item.rating,
    date: item.review_date,
    packaging: packaging || undefined,
    beautyProfile: beautyProfile || undefined,
    photos: filteredPhotos,
    sellerResponse: item.sellers_response || undefined,
  };
}

export default function ReviewSection({ productId, initialData }: ReviewSectionProps) {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentFilter>('전체');
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordFilter>('전체');
  const [sortOrder, setSortOrder] = useState<'rating' | 'date'>('rating');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const apiSentimentType = useMemo(() => {
    if (selectedSentiment === '전체') return null;
    if (selectedSentiment === '긍정') return 'POSITIVE';
    if (selectedSentiment === '중립') return 'NEUTRAL';
    if (selectedSentiment === '부정') return 'NEGATIVE';
    return null;
  }, [selectedSentiment]);

  const apiAspectType = useMemo(() => {
    if (selectedKeyword === '전체') return null;
    const keywordMap: Record<string, string> = {
      '수분': 'Moisture',
      '저자극': 'Gentle',
      '클렌징': 'Cleansing',
      '질감': 'Texture',
      '배송': 'Delivery',
    };
    return keywordMap[selectedKeyword] || null;
  }, [selectedKeyword]);

  const apiSort = useMemo(() => {
    if (sortOrder === 'rating') return 'RATING';
    if (sortOrder === 'date') return 'LATEST';
    return 'RATING';
  }, [sortOrder]);

  const { reviews, isLoading, hasNext, error, loadMore } = useReviewList({
    productId,
    sort: apiSort,
    sentimentType: apiSentimentType,
    aspectType: apiAspectType,
    size: 10,
    initialData,
  });

  const observerTarget = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadMore,
  });

  const convertedReviews = useMemo(() => {
    return reviews.map(convertReviewItemToReviewData);
  }, [reviews]);

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
  const keywordFilters: KeywordFilter[] = ['전체', '수분', '저자극', '클렌징', '질감', '배송'];

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
        {isLoading && convertedReviews.length === 0 ? (
          // 스켈레톤 UI
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="self-stretch p-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-start items-start gap-3">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-between items-start">
                    <div className="flex justify-start items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <div className="w-20 inline-flex flex-col justify-start items-start gap-1">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                      <div className="self-stretch inline-flex justify-start items-start gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse shrink-0" />
                        <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="self-stretch inline-flex justify-start items-start gap-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse shrink-0" />
                        <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : !isLoading && convertedReviews.length === 0 && !error ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="text-zinc-500 text-base font-medium font-['Pretendard']">
              리뷰가 없습니다
            </div>
          </div>
        ) : (
          <>
            {convertedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {error && (
              <div className="text-red-500 text-center py-4">
                {error}
              </div>
            )}
            {hasNext && <div ref={observerTarget} className="h-10" />}
          </>
        )}
      </div>
    </div>
  );
}

