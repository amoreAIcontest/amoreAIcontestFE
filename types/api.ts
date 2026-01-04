export interface ProductItem {
  product_id: number;
  title: string;
  image_url: string;
}

export interface SliceInfo {
  size: number;
  has_next: boolean;
  total_elements: number;
}

export interface ProductListResponse {
  status: string;
  message: string;
  code: number;
  data: {
    items: ProductItem[];
    slice: SliceInfo;
  };
}

export interface ProductListParams {
  category?: string | null;
  sort?: string | null;
  lastId?: number | null;
  size?: number;
}

export interface ProductDetailData {
  name: string;
  category: string;
  sold_count: string;
  liked_count: string;
  review_count: string;
  rating: number;
  thumbnail_url: string;
}

export interface ProductDetailResponse {
  status: string;
  message: string;
  code: number;
  data: {
    product_id: number;
    product_detail: ProductDetailData;
  };
}

export interface ProductRatingsData {
  star_1: number;
  star_2: number;
  star_3: number;
  star_4: number;
  star_5: number;
}

export interface ProductRatingsResponse {
  status: string;
  message: string;
  code: number;
  data: ProductRatingsData;
}

export interface ProductSentimentData {
  very_negative: number;
  negative: number;
  neutral: number;
  positive: number;
  very_positive: number;
}

export interface ProductSentimentResponse {
  status: string;
  message: string;
  code: number;
  data: ProductSentimentData;
}

export interface ProductImagesData {
  images: string[];
}

export interface ProductImagesResponse {
  status: string;
  message: string;
  code: number;
  data: ProductImagesData;
}

