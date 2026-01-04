import { ProductListResponse, ProductListParams, ProductDetailResponse, ProductRatingsResponse, ProductSentimentResponse, ProductImagesResponse, ReviewListResponse, ReviewListParams, InsightResponse } from '@/types/api';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

export async function fetchProductList(
  params: ProductListParams = {},
  isServer: boolean = false
): Promise<ProductListResponse> {
  const queryParams = new URLSearchParams();
  
  if (params.category) {
    queryParams.append('category', params.category);
  }
  if (params.sort) {
    queryParams.append('sort', params.sort);
  }
  if (params.lastId !== null && params.lastId !== undefined) {
    queryParams.append('lastId', params.lastId.toString());
  }
  if (params.size) {
    queryParams.append('size', params.size.toString());
  }

  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/product/list?${queryParams.toString()}`
    : `/api/v1/product/list?${queryParams.toString()}`;

  const response = await fetch(url, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductListResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data;
}

export async function fetchProductDetail(
  productId: number,
  isServer: boolean = false
): Promise<ProductDetailResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/product/${productId}`
    : `/api/v1/product/${productId}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }

  const data: ProductDetailResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch product detail');
  }

  return data;
}

export async function fetchProductRatings(
  productId: number,
  isServer: boolean = false
): Promise<ProductRatingsResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/product/${productId}/ratings`
    : `/api/v1/product/${productId}/ratings`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product ratings');
  }

  const data: ProductRatingsResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch product ratings');
  }

  return data;
}

export async function fetchProductSentiment(
  productId: number,
  isServer: boolean = false
): Promise<ProductSentimentResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/reviews/sentiment-stats/${productId}`
    : `/api/v1/reviews/sentiment-stats/${productId}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product sentiment');
  }

  const data: ProductSentimentResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch product sentiment');
  }

  return data;
}

export async function fetchProductImages(
  productId: number,
  isServer: boolean = false
): Promise<ProductImagesResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/product/${productId}/images`
    : `/api/v1/product/${productId}/images`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product images');
  }

  const data: ProductImagesResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch product images');
  }

  return data;
}

export async function fetchReviewList(
  productId: number,
  params: ReviewListParams = {},
  isServer: boolean = false
): Promise<ReviewListResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const queryParams = new URLSearchParams();
  
  if (params.lastId !== null && params.lastId !== undefined) {
    queryParams.append('lastId', params.lastId.toString());
  }
  if (params.size) {
    queryParams.append('size', params.size.toString());
  }
  if (params.sort) {
    queryParams.append('sort', params.sort);
  }
  if (params.sentimentType) {
    queryParams.append('sentimentType', params.sentimentType);
  }
  if (params.aspectType) {
    queryParams.append('aspectType', params.aspectType);
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/reviews/${productId}?${queryParams.toString()}`
    : `/api/v1/reviews/${productId}?${queryParams.toString()}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const data: ReviewListResponse = await response.json();
  
  console.log('[fetchReviewList] Response:', JSON.stringify(data, null, 2));

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch reviews');
  }

  return data;
}

export async function fetchInsights(
  productId: number,
  isServer: boolean = false
): Promise<InsightResponse> {
  if (isServer && !API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required for server-side requests');
  }

  const url = API_BASE_URL
    ? `${API_BASE_URL}/api/v1/insights/${productId}/analyze`
    : `/api/v1/insights/${productId}/analyze`;

  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch insights');
  }

  const data: InsightResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to fetch insights');
  }

  return data;
}

