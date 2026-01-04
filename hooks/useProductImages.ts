'use client';

import { useState, useEffect } from 'react';
import { ProductImagesResponse } from '@/types/api';
import { fetchProductImages } from '@/lib/api';

interface UseProductImagesOptions {
  productId: number;
  initialData?: ProductImagesResponse;
}

interface UseProductImagesReturn {
  images: string[];
  isLoading: boolean;
  error: string | null;
}

export function useProductImages({
  productId,
  initialData,
}: UseProductImagesOptions): UseProductImagesReturn {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setImages(initialData.data.images || []);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProductImages(productId, false);
        setImages(data.data.images || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [productId, initialData]);

  return {
    images,
    isLoading,
    error,
  };
}

