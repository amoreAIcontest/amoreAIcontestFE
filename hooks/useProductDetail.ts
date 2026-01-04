'use client';

import { useState, useEffect } from 'react';
import { ProductDetailResponse, ProductDetailData } from '@/types/api';

interface UseProductDetailOptions {
  productId: number;
  initialData?: ProductDetailResponse;
}

interface UseProductDetailReturn {
  product: ProductDetailData | null;
  isLoading: boolean;
  error: string | null;
}

export function useProductDetail({
  productId,
  initialData,
}: UseProductDetailOptions): UseProductDetailReturn {
  const [product, setProduct] = useState<ProductDetailData | null>(
    initialData?.data?.product_detail || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
        const url = API_BASE_URL
          ? `${API_BASE_URL}/api/v1/product/${productId}`
          : `/api/v1/product/${productId}`;

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product detail: ${response.status} ${response.statusText}`);
        }

        const data: ProductDetailResponse = await response.json();

        if (data.code !== 200) {
          throw new Error(data.message || 'Failed to fetch product detail');
        }

        setProduct(data.data.product_detail);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, initialData]);

  return {
    product,
    isLoading,
    error,
  };
}

