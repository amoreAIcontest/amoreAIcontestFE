'use client';

import { useEffect, useRef, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  hasNext: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasNext,
  isLoading,
  onLoadMore,
  threshold = 0.1,
}: UseInfiniteScrollOptions): RefObject<HTMLDivElement | null> {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !isLoading) {
          onLoadMore();
        }
      },
      { threshold }
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNext, isLoading, onLoadMore, threshold]);

  return observerTarget;
}

