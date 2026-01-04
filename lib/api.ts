import { ProductListResponse, ProductListParams } from '@/types/api';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

export async function fetchProductList(
  params: ProductListParams = {},
  isServer: boolean = false
): Promise<ProductListResponse> {
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

  const url = (isServer || API_BASE_URL)
    ? `${API_BASE_URL || 'https://amoreview.p-e.kr'}/api/v1/product/list?${queryParams.toString()}`
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

