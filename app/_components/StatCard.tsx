import Image from 'next/image';

export interface StatCardProps {
  label: string;
  value: string;
  icon: 'sell' | 'heart' | 'message' | 'star';
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  const iconPath = `/icons/detail-icon/${icon}.svg`;
  
  return (
    <div className="w-96 h-36 py-5 pl-9 pr-5 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="w-80 inline-flex justify-between items-start">
        <div className="w-24 inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-zinc-600 text-lg font-medium font-['Pretendard'] leading-7">
            {label}
          </div>
          <div className="self-stretch justify-start text-zinc-900 text-4xl font-semibold font-['Pretendard'] leading-[60px]">
            {value}
          </div>
        </div>
        <div className="w-16 h-16 p-3 bg-emerald-50 rounded-[60px] flex justify-center items-center gap-2.5">
          <div className="w-10 h-10 relative overflow-hidden">
            <Image
              src={iconPath}
              alt={label}
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

