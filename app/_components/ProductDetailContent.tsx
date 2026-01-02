import AnalyzeChip, { type AnalyzeType } from './AnalyzeChip';

interface ProductDetailContentProps {
  analyzeTypes?: AnalyzeType[];
}

export default function ProductDetailContent({ analyzeTypes = [] }: ProductDetailContentProps) {
  return (
    <div className="w-[375px] h-[345px] p-6 bg-neutral-100 rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="self-stretch justify-start text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6">
        상세 페이지 주요 내용
      </div>
      <div className="self-stretch flex flex-wrap gap-x-4 gap-y-2">
        {analyzeTypes.map((type) => (
          <AnalyzeChip key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

