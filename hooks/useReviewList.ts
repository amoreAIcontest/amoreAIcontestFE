'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ReviewListResponse, ReviewListParams, ReviewItem } from '@/types/api';
import { fetchReviewList } from '@/lib/api';

interface UseReviewListOptions {
  productId: number;
  sort?: string | null;
  sentimentType?: string | null;
  aspectType?: string | null;
  size?: number;
  initialData?: ReviewListResponse;
}

interface UseReviewListReturn {
  reviews: ReviewItem[];
  isLoading: boolean;
  hasNext: boolean;
  error: string | null;
  loadMore: () => void;
  totalElements: number;
}

export function useReviewList({
  productId,
  sort,
  sentimentType,
  aspectType,
  size = 10,
  initialData,
}: UseReviewListOptions): UseReviewListReturn {
  const [reviews, setReviews] = useState<ReviewItem[]>(
    initialData?.data.items || []
  );

  useEffect(() => {
    if (initialData) {
    }
  }, [initialData]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(
    initialData?.data.slice.has_next || false
  );
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<number | null>(
    initialData?.data.items && initialData.data.items.length > 0
      ? initialData.data.items[initialData.data.items.length - 1].review_id
      : null
  );
  const [totalElements, setTotalElements] = useState(
    initialData?.data.slice.total_elements || 0
  );

  const fetchReviews = useCallback(
    async (params: ReviewListParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchReviewList(productId, params, false);
        if (data.code !== 200) {
          throw new Error(data.message || 'Failed to fetch reviews');
        }
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [productId]
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    try {
      const data = await fetchReviews({
        sort,
        sentimentType,
        aspectType,
        lastId,
        size,
      });

      setReviews((prev) => [...prev, ...data.data.items]);
      setHasNext(data.data.slice.has_next);
      setTotalElements(data.data.slice.total_elements);

      if (data.data.items.length > 0) {
        setLastId(
          data.data.items[data.data.items.length - 1].review_id
        );
      }
    } catch {
    }
  }, [sort, sentimentType, aspectType, lastId, size, isLoading, hasNext, fetchReviews]);

  const isInitialMount = useRef(true);
  const prevSortRef = useRef<string | null | undefined>(sort);
  const prevSentimentTypeRef = useRef<string | null | undefined>(sentimentType);
  const prevAspectTypeRef = useRef<string | null | undefined>(aspectType);

  useEffect(() => {
    if (isInitialMount.current && initialData) {
      isInitialMount.current = false;
      prevSortRef.current = sort;
      prevSentimentTypeRef.current = sentimentType;
      prevAspectTypeRef.current = aspectType;
      return;
    }

    if (
      prevSortRef.current === sort &&
      prevSentimentTypeRef.current === sentimentType &&
      prevAspectTypeRef.current === aspectType
    ) {
      return;
    }

    isInitialMount.current = false;
    prevSortRef.current = sort;
    prevSentimentTypeRef.current = sentimentType;
    prevAspectTypeRef.current = aspectType;

    const resetAndFetch = async () => {
      setReviews([]);
      setLastId(null);
      setHasNext(true);
      setError(null);

      try {
        const data = await fetchReviews({
          sort,
          sentimentType,
          aspectType,
          lastId: null,
          size,
        });

        setReviews(data.data.items);
        setHasNext(data.data.slice.has_next);
        setTotalElements(data.data.slice.total_elements);

        if (data.data.items.length > 0) {
          setLastId(
            data.data.items[data.data.items.length - 1].review_id
          );
        }
      } catch {
      }
    };

    resetAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sentimentType, aspectType, size]);

  return {
    reviews,
    isLoading,
    hasNext,
    error,
    loadMore,
    totalElements,
  };
}

