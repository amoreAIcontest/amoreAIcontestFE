import Image from 'next/image';

export type SentimentType = 'veryPositive' | 'positive' | 'neutral' | 'negative' | 'veryNegative';

export interface SentimentData {
  type: SentimentType;
  percentage: number; 
}

interface SentimentDistributionProps {
  sentiments: SentimentData[];
}

const sentimentConfig: Record<SentimentType, { label: string; icon: string; barColor: string }> = {
  veryPositive: {
    label: '매우 긍정',
    icon: '/icons/detail-icon/smile-icon/good.svg',
    barColor: 'bg-sky-500',
  },
  positive: {
    label: '긍정',
    icon: '/icons/detail-icon/smile-icon/good.svg',
    barColor: 'bg-sky-500',
  },
  neutral: {
    label: '중립',
    icon: '/icons/detail-icon/smile-icon/normal.svg',
    barColor: 'bg-emerald-400',
  },
  negative: {
    label: '부정',
    icon: '/icons/detail-icon/smile-icon/bad.svg',
    barColor: 'bg-zinc-500',
  },
  veryNegative: {
    label: '매우 부정',
    icon: '/icons/detail-icon/smile-icon/veryBad.svg',
    barColor: 'bg-zinc-500',
  },
};
const sentimentOrder: SentimentType[] = ['veryPositive', 'positive', 'neutral', 'negative', 'veryNegative'];

export default function SentimentDistribution({ sentiments }: SentimentDistributionProps) {
  const sortedSentiments = [...sentiments].sort((a, b) => {
    const indexA = sentimentOrder.indexOf(a.type);
    const indexB = sentimentOrder.indexOf(b.type);
    return indexA - indexB;
  });

  return (
    <div className="w-96 h-80 p-6 bg-neutral-100 rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="w-80 flex flex-col justify-start items-start gap-4">
        <div className="self-stretch justify-start text-zinc-900 text-base font-semibold font-['Pretendard'] leading-6">
          대표 리뷰 감정 분석
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          {sortedSentiments.map((sentimentData) => {
            const config = sentimentConfig[sentimentData.type];
            return (
              <div key={sentimentData.type} className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="w-44 flex justify-start items-center gap-1">
                    <div className="w-5 h-5 relative overflow-hidden">
                      <Image
                        src={config.icon}
                        alt={config.label}
                        width={20}
                        height={20}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="justify-start text-zinc-800 text-sm font-semibold font-['Pretendard'] leading-5">
                      {config.label}
                    </div>
                  </div>
                  <div className="text-right justify-start text-zinc-600 text-sm font-medium font-['Pretendard'] leading-5">
                    {sentimentData.percentage}%
                  </div>
                </div>
                <div className="self-stretch h-1.5 bg-white rounded flex flex-col justify-start items-start gap-2.5">
                  <div
                    className={`h-1.5 ${config.barColor} rounded`}
                    style={{ width: `${sentimentData.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

