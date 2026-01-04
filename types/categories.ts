export interface CategoryItem {
  name: string;
  subcategories?: string[];
}

export const categories: CategoryItem[] = [
  { name: '전체' },
  {
    name: '스킨케어',
    subcategories: [
      '에센스/세럼/앰플',
      '로션/크림',
      '스킨/토너/미스트',
      '립/아이케어',
      '오일/마사지',
      '기획 세트',
      '기타',
    ],
  },
  {
    name: '선케어',
    subcategories: [
      '선크림',
      '선스틱',
      '선쿠션',
    ],
  },
  {
    name: '마스크팩',
    subcategories: [
      '시트팩',
      '패드',
      '워시오프',
    ],
  },
  {
    name: '클렌징',
    subcategories: [
      '폼 클렌징',
      '클렌징 오일',
      '클렌징 티슈',
      '클렌징 워터',
    ],
  },
  {
    name: '메이크업',
    subcategories: [
      '페이스메이크업',
      '아이메이크업',
      '립메이크업',
      '네일',
    ],
  },
  {
    name: '남성',
    subcategories: [
      '스킨케어',
      '클렌징',
      '헤어 왁스',
      '남성 기획 세트',
    ],
  },
  {
    name: '헤어바디/소품/펫',
    subcategories: [
      '바디 로션/미스트',
      '바디 워시/청결제',
      '핸드/풋케어',
      '샴푸/트리트먼트',
      '헤어 스타일링',
      '헤어바디/클렌징소품',
      '메이크업 소품',
      '기타 소품',
      '화장솜/면봉/기름종이',
      '펫',
    ],
  },
];

export interface CategoryMapping {
  category: string;
  subcategory?: string;
}

export const apiCategoryMapping: Record<string, CategoryMapping> = {
  'Body & Hair Care': {
    category: '헤어바디/소품/펫',
  },
  'Cleansing': {
    category: '클렌징',
  },
  'Toners': {
    category: '스킨케어',
    subcategory: '스킨/토너/미스트',
  },
  'Make Up': {
    category: '메이크업',
  },
  'Suncare': {
    category: '선케어',
  },
  'Serum & Essence': {
    category: '스킨케어',
    subcategory: '에센스/세럼/앰플',
  },
  'Creams & Lotions': {
    category: '스킨케어',
    subcategory: '로션/크림',
  },
  'Sheet Mask': {
    category: '마스크팩',
  },
};

export function mapApiCategoryToKorean(apiCategory: string): CategoryMapping | null {
  return apiCategoryMapping[apiCategory] || null;
}

export function mapKoreanToApiCategory(category: string, subcategory?: string): string | null {
  for (const [apiCategory, mapping] of Object.entries(apiCategoryMapping)) {
    if (mapping.category === category) {
      if (mapping.subcategory) {
        if (mapping.subcategory === subcategory) {
          return apiCategory;
        }
      } else {
        if (!subcategory) {
          return apiCategory;
        }
      }
    }
  }
  return null;
}
