'use client';

import { useState } from 'react';
import SearchBar from './_components/SearchBar';
import Header from './_components/Header';
import ProductCard from './_components/ProductCard';
import CategorySidebar from './_components/CategorySidebar';
import { products } from '@/types/products';

type SortOption = '신상품순' | '판매순' | '평점순';

export default function Home() {
  const [selectedSort, setSelectedSort] = useState<SortOption>('신상품순');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sortOptions: SortOption[] = ['신상품순', '판매순', '평점순'];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full bg-neutral-100">
        <div className="w-full bg-white h-[123px] flex items-center mb-6">
          <div className="w-full max-w-[1440px] mx-auto px-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex justify-start items-center gap-4 mb-6">
              {sortOptions.map((sortOption) => {
                const isSelected = selectedSort === sortOption;
                return (
                  <button
                    key={sortOption}
                    onClick={() => setSelectedSort(sortOption)}
                    className={`px-4 py-3 rounded-lg flex justify-center items-center gap-2.5 ${
                      isSelected ? 'bg-neutral-100' : ''
                    }`}
                  >
                    <div
                      className={`justify-start text-lg font-normal font-['Pretendard'] leading-7 ${
                        isSelected ? 'text-stone-950' : 'text-neutral-400'
                      }`}
                    >
                      {sortOption}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="shrink-0">
              <div className="justify-start text-stone-950 text-xl font-bold font-['Pretendard'] leading-8 mb-5">
                카테고리
              </div>
              <CategorySidebar />
            </div>

            <div className="flex-1 inline-flex flex-col justify-start items-start gap-10 ml-1">
              <div className="self-stretch flex justify-end">
                <div className="justify-start text-zinc-700 text-base font-normal font-['Pretendard'] leading-6 mr-40">
                  {filteredProducts.length}개의 상품이 있습니다
                </div>
              </div>
              {Array.from({ length: Math.ceil(filteredProducts.length / 3) }).map((_, rowIndex) => (
                <div key={rowIndex} className="self-stretch inline-flex justify-start items-center gap-[101px]">
                  {filteredProducts.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, index) => (
                    <ProductCard
                      key={rowIndex * 3 + index}
                      productId={product.id}
                      imageUrl={product.imageUrl}
                      title={product.title}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
