'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ProductListResponse, ProductListParams, ProductItem } from '@/types/api';

interface UseProductListOptions {
  category?: string | null;
  size?: number;
  initialData?: ProductListResponse;
}

interface UseProductListReturn {
  products: ProductItem[];
  isLoading: boolean;
  hasNext: boolean;
  error: string | null;
  loadMore: () => void;
  totalElements: number;
}

export function useProductList({
  category,
  size = 10,
  initialData,
}: UseProductListOptions = {}): UseProductListReturn {
  const [products, setProducts] = useState<ProductItem[]>(
    initialData?.data.items || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(
    initialData?.data.slice.has_next || false
  );
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<number | null>(
    initialData?.data.items && initialData.data.items.length > 0
      ? initialData.data.items[initialData.data.items.length - 1].product_id
      : null
  );
  const [totalElements, setTotalElements] = useState(
    initialData?.data.slice.total_elements || 0
  );

  const fetchProducts = useCallback(
    async (params: ProductListParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        if (params.category) {
          queryParams.append('category', params.category);
        }
        if (params.lastId !== null && params.lastId !== undefined) {
          queryParams.append('lastId', params.lastId.toString());
        }
        if (params.size) {
          queryParams.append('size', params.size.toString());
        }

        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
        const url = API_BASE_URL 
          ? `${API_BASE_URL}/api/v1/product/list?${queryParams.toString()}`
          : `/api/v1/product/list?${queryParams.toString()}`;

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const data: ProductListResponse = await response.json();
        if (data.code !== 200) {
          throw new Error(data.message || 'Failed to fetch products');
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
    []
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;

    try {
      const data = await fetchProducts({
        category,
        lastId,
        size,
      });

      setProducts((prev) => [...prev, ...data.data.items]);
      setHasNext(data.data.slice.has_next);
      setTotalElements(data.data.slice.total_elements);

      if (data.data.items.length > 0) {
        setLastId(
          data.data.items[data.data.items.length - 1].product_id
        );
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    }
  }, [category, lastId, size, isLoading, hasNext, fetchProducts]);

  const isInitialMount = useRef(true);
  const prevCategoryRef = useRef<string | null | undefined>(category);

  useEffect(() => {
    // Skip initial mount if we have initialData
    if (isInitialMount.current && initialData) {
      isInitialMount.current = false;
      prevCategoryRef.current = category;
      return;
    }
    if (prevCategoryRef.current === category) {
      return;
    }

    isInitialMount.current = false;
    prevCategoryRef.current = category;

    const resetAndFetch = async () => {
      setProducts([]);
      setLastId(null);
      setHasNext(true);
      setError(null);

      try {
        const data = await fetchProducts({
          category,
          lastId: null,
          size,
        });

        setProducts(data.data.items);
        setHasNext(data.data.slice.has_next);
        setTotalElements(data.data.slice.total_elements);

        if (data.data.items.length > 0) {
          setLastId(
            data.data.items[data.data.items.length - 1].product_id
          );
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    resetAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, size]);

  return {
    products,
    isLoading,
    hasNext,
    error,
    loadMore,
    totalElements,
  };
}

