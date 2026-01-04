import { fetchProductDetail, fetchProductRatings, fetchProductSentiment, fetchProductImages, fetchReviewList, fetchInsights } from '@/lib/api';
import Header from '../_components/Header';
import DetailContent from '../_components/DetailContent';

interface DetailPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function DetailPage({ searchParams }: DetailPageProps) {
  const params = await searchParams;
  const productId = params.id ? Number(params.id) : 0;

  const [initialData, initialRatingsData, initialSentimentData, initialImagesData, initialReviewsData, initialInsightsData] = await Promise.all([
    productId > 0
      ? fetchProductDetail(productId, true).catch(() => undefined)
      : undefined,
    productId > 0
      ? fetchProductRatings(productId, true).catch(() => undefined)
      : undefined,
    productId > 0
      ? fetchProductSentiment(productId, true).catch(() => undefined)
      : undefined,
    productId > 0
      ? fetchProductImages(productId, true).catch(() => undefined)
      : undefined,
    productId > 0
      ? fetchReviewList(productId, { size: 10 }, true).catch(() => undefined)
      : undefined,
    productId > 0
      ? fetchInsights(productId, true).catch(() => undefined)
      : undefined,
  ]);

  return (
    <div className="w-full min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full max-w-[1440px] mx-auto px-[100px] py-8 flex flex-col gap-8">
        <DetailContent initialData={initialData} initialRatingsData={initialRatingsData} initialSentimentData={initialSentimentData} initialImagesData={initialImagesData} initialReviewsData={initialReviewsData} initialInsightsData={initialInsightsData} />
      </div>
    </div>
  );
}

