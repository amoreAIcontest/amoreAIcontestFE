import AnalyzeChip, { type AnalyzeType } from './AnalyzeChip';

interface ProductDetailContentProps {
  keywords?: string[];
  analyzeTypes?: AnalyzeType[];
}

const keywordToAnalyzeTypeMap: Record<string, AnalyzeType> = {
  '수분': 'water',
  '유수분 밸런스': 'waterdrop',
  '저자극': 'skin',
  '제품 용기': 'product',
  '비건': 'leaf',
  '매끄러운 결케어': 'texture',
  '부드러움': 'smooth',
};

export default function ProductDetailContent({ keywords = [], analyzeTypes = [] }: ProductDetailContentProps) {
  const keywordsAsTypes: AnalyzeType[] = keywords
    .map((keyword) => keywordToAnalyzeTypeMap[keyword])
    .filter((type): type is AnalyzeType => type !== undefined);
  const displayTypes = [...keywordsAsTypes, ...analyzeTypes]
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="w-[375px] h-[335px] p-6 bg-neutral-100 rounded-3xl flex flex-col gap-2.5">
      <div className="text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6 shrink-0">
        상세 페이지 주요 내용
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 overflow-y-auto flex-1 min-h-0">
        {displayTypes.map((type) => (
          <AnalyzeChip key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

