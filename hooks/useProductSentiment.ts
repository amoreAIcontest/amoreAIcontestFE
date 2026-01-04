'use client';

import { useState, useEffect } from 'react';
import { ProductSentimentResponse } from '@/types/api';
import { fetchProductSentiment } from '@/lib/api';
import { SentimentData, SentimentType } from '@/app/_components/SentimentDistribution';

interface UseProductSentimentOptions {
  productId: number;
  initialData?: ProductSentimentResponse;
}

interface UseProductSentimentReturn {
  sentiments: SentimentData[];
  isLoading: boolean;
  error: string | null;
}

export function useProductSentiment({
  productId,
  initialData,
}: UseProductSentimentOptions): UseProductSentimentReturn {
  const [sentiments, setSentiments] = useState<SentimentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const sentimentData = initialData.data;
      const total = sentimentData.very_positive + sentimentData.positive + sentimentData.neutral + sentimentData.negative + sentimentData.very_negative;
      
      const convertedSentiments: SentimentData[] = [
        { type: 'veryPositive' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.very_positive / total) * 100) : 0 },
        { type: 'positive' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.positive / total) * 100) : 0 },
        { type: 'neutral' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.neutral / total) * 100) : 0 },
        { type: 'negative' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.negative / total) * 100) : 0 },
        { type: 'veryNegative' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.very_negative / total) * 100) : 0 },
      ];
      
      setSentiments(convertedSentiments);
      return;
    }

    const fetchSentiment = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProductSentiment(productId, false);
        const sentimentData = data.data;
        const total = sentimentData.very_positive + sentimentData.positive + sentimentData.neutral + sentimentData.negative + sentimentData.very_negative;
        
        const convertedSentiments: SentimentData[] = [
          { type: 'veryPositive' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.very_positive / total) * 100) : 0 },
          { type: 'positive' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.positive / total) * 100) : 0 },
          { type: 'neutral' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.neutral / total) * 100) : 0 },
          { type: 'negative' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.negative / total) * 100) : 0 },
          { type: 'veryNegative' as SentimentType, percentage: total > 0 ? Math.round((sentimentData.very_negative / total) * 100) : 0 },
        ];
        
        setSentiments(convertedSentiments);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentiment();
  }, [productId, initialData]);

  return {
    sentiments,
    isLoading,
    error,
  };
}

