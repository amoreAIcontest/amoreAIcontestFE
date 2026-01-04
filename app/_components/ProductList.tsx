'use client';

import Image from 'next/image';
import ProductCard from './ProductCard';
import { useProductList } from '@/hooks/useProductList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ProductListResponse } from '@/types/api';

interface ProductListProps {
  initialData?: ProductListResponse;
  category?: string | null;
}

export default function ProductList({ initialData, category }: ProductListProps) {
  const { products, isLoading, hasNext, error, loadMore, totalElements } =
    useProductList({
      category,
      size: 10,
      initialData,
    });

  const observerTarget = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadMore,
  });

  if (!isLoading && !error && products.length === 0) {
    return (
      <div className="self-stretch flex flex-col items-center justify-center py-20">
        <div className="w-52 inline-flex flex-col justify-start items-center gap-4">
          <div className="w-28 h-28 p-5 bg-emerald-50 rounded-[53px] inline-flex justify-center items-center gap-2.5">
            <Image
              src="/icons/home-icon/shoppingBag.svg"
              alt="빈 상품"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
          <div className="self-stretch justify-start text-zinc-600 text-2xl font-bold font-['Pretendard'] leading-9">
            등록된 상품이 없어요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="self-stretch flex justify-end">
        <div className="justify-start text-zinc-700 text-base font-normal font-['Pretendard'] leading-6 mr-40">
          {totalElements}개의 상품이 있습니다
        </div>
      </div>
      {Array.from({ length: Math.ceil(products.length / 3) }).map((_, rowIndex) => (
        <div key={rowIndex} className="self-stretch inline-flex justify-start items-center gap-[101px]">
          {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, index) => (
            <ProductCard
              key={rowIndex * 3 + index}
              productId={product.product_id}
              imageUrl={product.image_url}
              title={product.title}
            />
          ))}
        </div>
      ))}
      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}
      {hasNext && <div ref={observerTarget} className="h-10" />}
    </>
  );
}

