import Image from 'next/image';

export type AnalyzeType = 'water' | 'waterdrop' | 'skin' | 'product' | 'leaf' | 'texture' | 'smooth';

interface AnalyzeChipProps {
  type: AnalyzeType;
}

const analyzeConfig: Record<AnalyzeType, { label: string; icon: string; bgColor: string; iconColor: string }> = {
  water: {
    label: '수분',
    icon: '/icons/detail-icon/analyze-icon/water.svg',
    bgColor: 'bg-sky-100',
    iconColor: 'bg-sky-500',
  },
  waterdrop: {
    label: '유수분 밸런스',
    icon: '/icons/detail-icon/analyze-icon/waterdrop.svg',
    bgColor: 'bg-sky-100',
    iconColor: 'bg-sky-500',
  },
  skin: {
    label: '저자극',
    icon: '/icons/detail-icon/analyze-icon/skin.svg',
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500',
  },
  product: {
    label: '제품 용기',
    icon: '/icons/detail-icon/analyze-icon/product.svg',
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500',
  },
  leaf: {
    label: '비건',
    icon: '/icons/detail-icon/analyze-icon/leaf.svg',
    bgColor: 'bg-emerald-50',
    iconColor: 'bg-emerald-500',
  },
  texture: {
    label: '매끄러운 결케어',
    icon: '/icons/detail-icon/analyze-icon/texture.svg',
    bgColor: 'bg-sky-100',
    iconColor: 'bg-sky-500',
  },
  smooth: {
    label: '부드러움',
    icon: '/icons/detail-icon/analyze-icon/smooth.svg',
    bgColor: 'bg-sky-100',
    iconColor: 'bg-sky-500',
  },
};

export default function AnalyzeChip({ type }: AnalyzeChipProps) {
  const config = analyzeConfig[type];

  return (
    <div className="h-14 pl-1 pr-5 py-1 bg-white rounded-[34px] inline-flex flex-col justify-start items-start gap-2.5">
      <div className="inline-flex justify-start items-center gap-2">
        <div className={`w-11 h-11 p-2.5 ${config.bgColor} rounded-3xl flex justify-start items-center gap-2.5`}>
          <div className="w-6 h-6 relative overflow-hidden shrink-0">
            <Image
              src={config.icon}
              alt={config.label}
              width={24}
              height={24}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="justify-start text-zinc-700 text-xl font-semibold font-['Pretendard'] leading-8">
          {config.label}
        </div>
      </div>
    </div>
  );
}

