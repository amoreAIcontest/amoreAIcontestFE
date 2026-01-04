'use client';

import { useState, useEffect } from 'react';
import { InsightResponse } from '@/types/api';
import { fetchInsights } from '@/lib/api';

interface UseInsightsOptions {
  productId: number;
  initialData?: InsightResponse;
}

interface UseInsightsReturn {
  insights: InsightResponse['data'] | null;
  isLoading: boolean;
  error: string | null;
}

export function useInsights({
  productId,
  initialData,
}: UseInsightsOptions): UseInsightsReturn {
  const [insights, setInsights] = useState<InsightResponse['data'] | null>(
    initialData?.data || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      return;
    }

    const fetchInsightsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchInsights(productId, false);
        setInsights(data.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsightsData();
  }, [productId, initialData]);

  return {
    insights,
    isLoading,
    error,
  };
}

