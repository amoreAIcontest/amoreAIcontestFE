export interface CategoryItem {
  name: string;
  subcategories?: string[];
}

export const categories: CategoryItem[] = [
  { name: '전체' },
  {
    name: '스킨케어',
    subcategories: ['전체', '클렌징', '토너', '에센스', '세럼', '크림', '로션', '마스크', '선크림', '아이크림', '미스트'],
  },
  {
    name: '메이크업',
    subcategories: ['전체', '파운데이션', '립스틱', '아이섀도', '마스카라', '블러셔'],
  },
  {
    name: '향수',
    subcategories: ['전체', '여성향수', '남성향수', '유니섹스', '니시향수'],
  },
  {
    name: '생활용품',
    subcategories: ['전체', '세제', '섬유유연제', '청소용품', '욕실용품'],
  },
  {
    name: '소품&도구',
    subcategories: ['전체', '브러시', '스펀지', '페이셜툴', '메이크업툴'],
  },
  {
    name: '뷰티 푸드',
    subcategories: ['전체', '콜라겐', '비타민', '프로틴', '건강식품'],
  },
  {
    name: '남성',
    subcategories: ['전체', '스킨케어', '클렌징', '로션', '에센스'],
  },
  {
    name: '베이비',
    subcategories: ['전체', '베이비로션', '베이비크림', '베이비샴푸', '베이비바디워시'],
  },
  {
    name: '뷰티 디바이스',
    subcategories: ['전체', '페이셜기기', '마사지기', '청소기기', 'LED기기'],
  },
  {
    name: '반려 동물 용품',
    subcategories: ['전체', '강아지용품', '고양이용품', '반려동물사료', '반려동물간식'],
  },
];

