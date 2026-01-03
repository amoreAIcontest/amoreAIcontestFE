'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductDetailImageProps {
  imageUrl: string;
  alt?: string;
}

export default function ProductDetailImage({ imageUrl, alt = '상세 페이지' }: ProductDetailImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-96 rounded-3xl overflow-hidden relative">
      {isExpanded ? (
        <div className="w-full max-h-[1000px] overflow-y-auto">
          <Image
            src={imageUrl}
            alt={alt}
            width={384}
            height={2000}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full h-[540px] overflow-hidden relative flex flex-col justify-end">
          <Image
            src={imageUrl}
            alt={alt}
            width={384}
            height={2000}
            className="w-full h-auto"
            unoptimized
          />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-linear-to-b from-neutral-700/0 to-zinc-800 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-36 px-24 py-4 bg-linear-to-b from-neutral-700/0 to-zinc-800 inline-flex flex-col justify-end items-center gap-2.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex justify-start items-center gap-2 cursor-pointer z-10"
            >
              <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-6">
                상세 페이지 펼쳐보기
              </div>
              <div className="w-6 h-6 relative overflow-hidden">
                <Image
                  src="/icons/detail-icon/down.svg"
                  alt="펼치기"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

