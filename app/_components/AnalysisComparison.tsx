import AnalysisTextarea from './AnalysisTextarea';

interface AnalysisComparisonProps {
  commonPoints?: string;
  differences?: string;
  onCommonPointsChange?: (value: string) => void;
  onDifferencesChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function AnalysisComparison({
  commonPoints = '',
  differences = '',
  onCommonPointsChange,
  onDifferencesChange,
  readOnly = false,
}: AnalysisComparisonProps) {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-5">
      <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-8">
        상세 페이지 & 리뷰 분석 결과
      </div>
      <div className="self-stretch h-72 inline-flex justify-start items-center gap-7">
        <AnalysisTextarea
          label="공통점"
          value={commonPoints}
          onChange={onCommonPointsChange}
          readOnly={readOnly}
        />
        <AnalysisTextarea
          label="차이점"
          value={differences}
          onChange={onDifferencesChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}

