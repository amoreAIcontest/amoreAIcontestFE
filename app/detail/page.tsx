'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductDetailHeader from '../_components/ProductDetailHeader';
import ProductDetailContent from '../_components/ProductDetailContent';
import ProductDetailImage from '../_components/ProductDetailImage';
import ReviewSection from '../_components/ReviewSection';
import AnalysisComparison from '../_components/AnalysisComparison';
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
        <AnalysisComparison 
          commonPoints="캡과 용기 모두 PP 단일소재를 사용하여 분리배출이 용이하게 하였습니다.

재생 플라스틱 캡
버려진 플라스틱을 재가공하여 만든 재생 원료를 캡에 적용하였습니다.

비건 인증 완료

수분 공급 기능
상세 페이지와 리뷰 모두에서 제품의 수분 공급 효과에 대해 긍정적으로 언급하고 있습니다.

저자극 성분
두 분석 결과 모두 저자극 성분 사용을 강조하고 있으며, 민감한 피부에도 안전하게 사용 가능하다고 명시되어 있습니다.

유수분 밸런스
상세 페이지의 주요 특징과 리뷰에서 언급된 사용감이 모두 유수분 밸런스 조절에 초점을 맞추고 있습니다."
          differences="상세 페이지에서는 제품의 포장재와 용기 재질에 대한 상세한 정보를 제공하지만, 리뷰에서는 실제 사용 경험과 포장 상태에 대한 평가가 주로 다뤄집니다.

상세 페이지는 제품의 기술적 특징과 인증 정보를 강조하는 반면, 리뷰는 실제 사용자의 피부 타입별 반응과 장기 사용 후기를 중심으로 구성되어 있습니다.

상세 페이지의 분석 결과는 제품의 객관적 특성에 집중하지만, 리뷰 분석 결과는 주관적인 만족도와 감정적 반응을 포함하고 있습니다.

제품 용기 형태에 대한 정보는 상세 페이지에서만 명시되며, 리뷰에서는 용기의 실용성과 디자인에 대한 평가가 주로 이루어집니다.

상세 페이지는 제품의 지속가능성과 환경 친화적 특징을 강조하지만, 리뷰에서는 이러한 측면보다는 제품의 효과와 가성비에 대한 평가가 더 많이 나타납니다."
          readOnly={true}
        />
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

