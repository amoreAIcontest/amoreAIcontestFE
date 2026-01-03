interface AnalysisTextareaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function AnalysisTextarea({ label, value, onChange, readOnly = false }: AnalysisTextareaProps) {
  return (
    <div className="self-stretch p-6 bg-neutral-100 rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="w-[529px] flex-1 flex flex-col justify-start items-start gap-4">
        <div className="self-stretch justify-start text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6">
          {label}
        </div>
        <div className="self-stretch flex-1 bg-white rounded-2xl overflow-hidden">
          {readOnly ? (
            <div className="w-full h-full p-4 text-zinc-900 text-sm font-normal font-['Pretendard'] leading-5 overflow-y-auto whitespace-pre-wrap">
              {value || ''}
            </div>
          ) : (
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full h-full p-4 text-zinc-900 text-sm font-normal font-['Pretendard'] leading-5 bg-transparent border-none outline-none resize-none rounded-2xl"
              placeholder={`${label}을 입력하세요`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

