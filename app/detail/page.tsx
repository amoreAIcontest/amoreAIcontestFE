'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductDetailHeader from '../_components/ProductDetailHeader';
import ProductDetailContent from '../_components/ProductDetailContent';
import ProductDetailImage from '../_components/ProductDetailImage';
import ReviewSection from '../_components/ReviewSection';
import RatingDistribution from '../_components/RatingDistribution';
import SentimentDistribution from '../_components/SentimentDistribution';
import { products } from '@/types/products';
import Header from '../_components/Header';
import { type AnalyzeType } from '../_components/AnalyzeChip';

function DetailContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const product = productId 
    ? products.find((p) => p.id === Number(productId))
    : products[0];

  return (
    <>
      <ProductDetailHeader 
        title={product?.title || '그린티 아미노 수분 클렌징 폼 150g'}
        categoryName="스킨케어"
        subcategoryName="클렌징"
      />
      <div className="w-full bg-white p-7 rounded-[32px] flex flex-col gap-8">
        <div className="w-full flex gap-5">
          <div className="flex-1 flex flex-col gap-5">
            <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-[30px]">
              상세 페이지 분석 결과
            </div>
            <ProductDetailContent 
              analyzeTypes={['water', 'waterdrop', 'skin', 'product', 'leaf', 'smooth', 'texture'] as AnalyzeType[]}
            />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-[30px]">
              리뷰 분석 결과
            </div>
            <div className="flex gap-5">
              <RatingDistribution 
                ratings={[
                  { rating: 5, percentage: 75 },
                  { rating: 4, percentage: 50 },
                  { rating: 3, percentage: 25 },
                  { rating: 2, percentage: 25 },
                  { rating: 1, percentage: 25 },
                ]}
              />
              <SentimentDistribution 
                sentiments={[
                  { type: 'veryPositive', percentage: 75 },
                  { type: 'positive', percentage: 75 },
                  { type: 'neutral', percentage: 50 },
                  { type: 'negative', percentage: 25 },
                  { type: 'veryNegative', percentage: 25 },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-5 justify-center">
          <ProductDetailImage imageUrl="/dummy.png" alt={product?.title || '상세 페이지'} />
          <ReviewSection 
            reviews={[
              {
                id: '1',
                username: 'j*****y',
                profileImage: 'https://placehold.co/40x40',
                rating: 3,
                date: '2025.12.24 13:00',
                packaging: 'Super good, and everything came undamaged. Easy to recycle aswell.',
                beautyProfile: 'Good Product for oily skin. Have stuck with innisfree ever since my first time taking skin care seriously :)',
                sellerResponse: 'Dear Customer, We are grateful you took the time to leave us a review and a 3-star rating. We are happy to know that you have already received your order. Hope you enjoyed our products as much as we did! Thank you and we look forward to hearing from you again.',
              },
              {
                id: '2',
                username: 'j*****y',
                profileImage: 'https://placehold.co/40x40',
                rating: 3,
                date: '2025.12.24 13:00',
                packaging: 'Super good, and everything came undamaged. Easy to recycle aswell.',
                beautyProfile: 'Good Product for oily skin. Have stuck with innisfree ever since my first time taking skin care seriously :)',
                sellerResponse: 'Dear Customer, We are grateful you took the time to leave us a review and a 3-star rating. We are happy to know that you have already received your order. Hope you enjoyed our products as much as we did! Thank you and we look forward to hearing from you again.',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default function DetailPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full max-w-[1440px] mx-auto px-[100px] py-8 flex flex-col gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <DetailContent />
        </Suspense>
      </div>
    </div>
  );
}

