'use client';

import { useState } from 'react';
import { categories } from '@/types/categories';

interface CategoryInfo {
  category: string;
  subcategory?: string;
}

interface CategorySidebarProps {
  onCategoryChange?: (categoryInfo: CategoryInfo | null) => void;
}

export default function CategorySidebar({ onCategoryChange }: CategorySidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    categories.forEach((category) => {
      if (category.subcategories && category.subcategories.length > 0) {
        initial[category.name] = category.subcategories[0]; 
      }
    });
    return initial;
  });

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (categoryName === '전체') {
      onCategoryChange?.(null);
      setExpandedCategory(null);
    } else {
      const categoryInfo: CategoryInfo = { category: categoryName };
      onCategoryChange?.(categoryInfo);
      toggleCategory(categoryName);
    }
  };

  const handleSubcategoryClick = (categoryName: string, subcategoryName: string) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [categoryName]: subcategoryName,
    }));
    const categoryInfo: CategoryInfo = {
      category: categoryName,
      subcategory: subcategoryName,
    };
    onCategoryChange?.(categoryInfo);
  };

  return (
    <div className="w-72 inline-flex flex-col justify-start items-start gap-5">
      {categories.map((category, index) => (
        <div key={index} className="self-stretch flex flex-col justify-start items-start">
          {index === 0 ? (
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`self-stretch p-2.5 rounded-lg inline-flex justify-start items-center gap-2.5 ${
                selectedCategory === category.name ? 'bg-emerald-50' : ''
              }`}
            >
              <div
                className={`justify-start text-lg font-['Pretendard'] leading-7 ${
                  selectedCategory === category.name
                    ? 'text-emerald-500 font-bold'
                    : 'text-zinc-500 font-normal'
                }`}
              >
                {category.name}
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={() => category.subcategories && handleCategoryClick(category.name)}
                className={`self-stretch p-2.5 rounded-lg inline-flex justify-start items-center gap-2.5 ${
                  selectedCategory === category.name || (expandedCategory === category.name && category.subcategories)
                    ? 'bg-emerald-50'
                    : ''
                }`}
              >
                <div
                  className={`justify-start text-lg font-['Pretendard'] leading-7 ${
                    selectedCategory === category.name || (expandedCategory === category.name && category.subcategories)
                      ? 'text-emerald-500 font-bold'
                      : 'text-zinc-500 font-normal'
                  }`}
                >
                  {category.name}
                </div>
              </button>
              {category.subcategories && expandedCategory === category.name && (
                <div className="self-stretch flex flex-col justify-start items-start mt-4">
                  {category.subcategories.map((subcategory, subIndex) => {
                    const isSelected = selectedSubcategories[category.name] === subcategory;
                    return (
                      <button
                        key={subIndex}
                        onClick={() => handleSubcategoryClick(category.name, subcategory)}
                        className="w-72 px-5 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5"
                      >
                        <div
                          className={`justify-start text-sm font-normal font-['Pretendard'] leading-5 ${
                            isSelected ? 'text-stone-950' : 'text-neutral-400'
                          }`}
                        >
                          {subcategory}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

