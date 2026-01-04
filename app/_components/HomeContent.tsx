'use client';

import { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import Header from './Header';
import ProductList from './ProductList';
import CategorySidebar from './CategorySidebar';
import { ProductListResponse } from '@/types/api';
import { mapKoreanToApiCategory } from '@/types/categories';

type SortOption = '신상품순' | '판매순' | '평점순';

interface CategoryInfo {
  category: string;
  subcategory?: string;
}

interface HomeContentProps {
  initialData?: ProductListResponse;
}

export default function HomeContent({ initialData }: HomeContentProps) {
  const [selectedSort, setSelectedSort] = useState<SortOption>('신상품순');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<CategoryInfo | null>(null);

  const apiCategory = useMemo(() => {
    if (!selectedCategoryInfo) return null;
    return mapKoreanToApiCategory(
      selectedCategoryInfo.category,
      selectedCategoryInfo.subcategory
    );
  }, [selectedCategoryInfo]);

  const apiSort = useMemo(() => {
    // '신상품순'은 None이므로 null 반환, API에서 None=신상품순으로 처리
    if (selectedSort === '신상품순') return null;
    if (selectedSort === '판매순') return 'SOLD';
    if (selectedSort === '평점순') return 'RATING';
    return null;
  }, [selectedSort]);

  const sortOptions: SortOption[] = ['신상품순', '판매순', '평점순'];

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
              <CategorySidebar onCategoryChange={setSelectedCategoryInfo} />
            </div>

            <div className="flex-1 inline-flex flex-col justify-start items-start gap-10 ml-1">
              <ProductList initialData={initialData} category={apiCategory} sort={apiSort} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

