'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductDetailHeader from './ProductDetailHeader';
import ProductDetailContent from './ProductDetailContent';
import ProductDetailImage from './ProductDetailImage';
import ReviewSection from './ReviewSection';
import AnalysisComparison from './AnalysisComparison';
import InsightSection from './InsightSection';
import RatingDistribution from './RatingDistribution';
import SentimentDistribution from './SentimentDistribution';
import DetailContentSkeleton from './DetailContentSkeleton';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductRatings } from '@/hooks/useProductRatings';
import { useProductSentiment } from '@/hooks/useProductSentiment';
import { useProductImages } from '@/hooks/useProductImages';
import { useInsights } from '@/hooks/useInsights';
import { ProductDetailResponse, ProductRatingsResponse, ProductSentimentResponse, ProductImagesResponse, ReviewListResponse, InsightResponse } from '@/types/api';
import { mapApiCategoryToKorean } from '@/types/categories';

interface DetailContentProps {
  initialData?: ProductDetailResponse;
  initialRatingsData?: ProductRatingsResponse;
  initialSentimentData?: ProductSentimentResponse;
  initialImagesData?: ProductImagesResponse;
  initialReviewsData?: ReviewListResponse;
  initialInsightsData?: InsightResponse;
}

function DetailContentInner({ 
  initialData, 
  initialRatingsData, 
  initialSentimentData, 
  initialImagesData, 
  initialReviewsData, 
  initialInsightsData 
}: DetailContentProps = {}) {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const productIdNumber = productId ? Number(productId) : 0;
  const { product, isLoading: isLoadingDetail, error } = useProductDetail({
    productId: productIdNumber,
    initialData,
  });

  const { ratings, isLoading: isLoadingRatings } = useProductRatings({
    productId: productIdNumber,
    initialData: initialRatingsData,
  });

  const { sentiments, isLoading: isLoadingSentiment } = useProductSentiment({
    productId: productIdNumber,
    initialData: initialSentimentData,
  });

  const { images, isLoading: isLoadingImages } = useProductImages({
    productId: productIdNumber,
    initialData: initialImagesData,
  });

  const { insights, isLoading: isLoadingInsights } = useInsights({
    productId: productIdNumber,
    initialData: initialInsightsData,
  });

  const isAnyLoading = 
    (!initialData && isLoadingDetail) ||
    (!initialRatingsData && isLoadingRatings) ||
    (!initialSentimentData && isLoadingSentiment) ||
    (!initialImagesData && isLoadingImages) ||
    (!initialInsightsData && isLoadingInsights);

  const categoryMapping = product?.category
    ? mapApiCategoryToKorean(product.category)
    : null;

  if (isAnyLoading) {
    return <DetailContentSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductDetailHeader 
        title={product.name}
        categoryName={categoryMapping?.category}
        subcategoryName={categoryMapping?.subcategory}
        thumbnailUrl={product.thumbnail_url}
        soldCount={product.sold_count}
        likedCount={product.liked_count}
        reviewCount={product.review_count}
        rating={product.rating}
      />
      <div className="w-full bg-white p-7 rounded-[32px] flex flex-col gap-8">
        <div className="w-full flex gap-5">
          <div className="flex-1 flex flex-col gap-5">
            <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-[30px]">
              상세 페이지 분석 결과
            </div>
            <ProductDetailContent 
              keywords={insights?.keywords}
            />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-[30px]">
              리뷰 분석 결과
            </div>
            <div className="flex gap-5">
              <RatingDistribution 
                ratings={ratings}
              />
              <SentimentDistribution 
                sentiments={sentiments}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-5 justify-center">
          <ProductDetailImage images={images} alt={product.name} />
          <ReviewSection 
            productId={productIdNumber}
            initialData={initialReviewsData}
          />
        </div>
        <AnalysisComparison 
          commonPoints={insights?.comparison.matches.join('\n\n') || ''}
          differences={insights?.comparison.mismatches.join('\n\n') || ''}
          readOnly={true}
        />
      </div>
      <InsightSection
        productAppealText={insights?.strategy.appeals.join('\n\n') || ''}
        salesStrategyText={insights?.strategy.strategies.join('\n\n') || ''}
        improvementImageUrl={insights?.canvas_suggestion?.[0]?.visual_description || ''}
        improvementText={insights?.canvas_suggestion?.[0]?.copywriting || ''}
        canvasSuggestions={insights?.canvas_suggestion}
      />
    </>
  );
}

export default function DetailContent({ 
  initialData, 
  initialRatingsData, 
  initialSentimentData, 
  initialImagesData, 
  initialReviewsData, 
  initialInsightsData 
}: DetailContentProps = {}) {
  return (
    <Suspense fallback={<DetailContentSkeleton />}>
      <DetailContentInner 
        initialData={initialData} 
        initialRatingsData={initialRatingsData} 
        initialSentimentData={initialSentimentData} 
        initialImagesData={initialImagesData} 
        initialReviewsData={initialReviewsData} 
        initialInsightsData={initialInsightsData} 
      />
    </Suspense>
  );
}

