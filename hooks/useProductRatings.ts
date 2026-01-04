'use client';

import { useState, useEffect } from 'react';
import { ProductRatingsResponse } from '@/types/api';
import { fetchProductRatings } from '@/lib/api';
import { RatingData as RatingDistributionData } from '@/app/_components/RatingDistribution';

interface UseProductRatingsOptions {
  productId: number;
  initialData?: ProductRatingsResponse;
}

interface UseProductRatingsReturn {
  ratings: RatingDistributionData[];
  isLoading: boolean;
  error: string | null;
}

export function useProductRatings({
  productId,
  initialData,
}: UseProductRatingsOptions): UseProductRatingsReturn {
  const [ratings, setRatings] = useState<RatingDistributionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const ratingsData = initialData.data;
      const total = ratingsData.star_1 + ratingsData.star_2 + ratingsData.star_3 + ratingsData.star_4 + ratingsData.star_5;
      
      const convertedRatings: RatingDistributionData[] = [
        { rating: 5, percentage: total > 0 ? Math.round((ratingsData.star_5 / total) * 100) : 0 },
        { rating: 4, percentage: total > 0 ? Math.round((ratingsData.star_4 / total) * 100) : 0 },
        { rating: 3, percentage: total > 0 ? Math.round((ratingsData.star_3 / total) * 100) : 0 },
        { rating: 2, percentage: total > 0 ? Math.round((ratingsData.star_2 / total) * 100) : 0 },
        { rating: 1, percentage: total > 0 ? Math.round((ratingsData.star_1 / total) * 100) : 0 },
      ];
      
      setRatings(convertedRatings);
      return;
    }

    const fetchRatings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProductRatings(productId, false);
        const ratingsData = data.data;
        const total = ratingsData.star_1 + ratingsData.star_2 + ratingsData.star_3 + ratingsData.star_4 + ratingsData.star_5;
        
        const convertedRatings: RatingDistributionData[] = [
          { rating: 5, percentage: total > 0 ? Math.round((ratingsData.star_5 / total) * 100) : 0 },
          { rating: 4, percentage: total > 0 ? Math.round((ratingsData.star_4 / total) * 100) : 0 },
          { rating: 3, percentage: total > 0 ? Math.round((ratingsData.star_3 / total) * 100) : 0 },
          { rating: 2, percentage: total > 0 ? Math.round((ratingsData.star_2 / total) * 100) : 0 },
          { rating: 1, percentage: total > 0 ? Math.round((ratingsData.star_1 / total) * 100) : 0 },
        ];
        
        setRatings(convertedRatings);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [productId, initialData]);

  return {
    ratings,
    isLoading,
    error,
  };
}

