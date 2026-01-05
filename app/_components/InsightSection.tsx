'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CanvasSuggestion } from '@/types/api';

type InsightTab = 'productAppeal' | 'salesStrategy' | 'improvement';

interface InsightSectionProps {
  productAppealText?: string;
  salesStrategyText?: string;
  improvementImageUrl?: string;
  improvementText?: string;
  canvasSuggestions?: CanvasSuggestion[];
}

function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function InsightSection({
  productAppealText = '',
  salesStrategyText = '',
  improvementImageUrl = '',
  improvementText = '',
  canvasSuggestions = [],
}: InsightSectionProps) {
  const [activeTab, setActiveTab] = useState<InsightTab>('productAppeal');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // canvasSuggestions가 있으면 url 우선, 없으면 기존 improvementImageUrl 사용
  const imageUrls = canvasSuggestions.length > 0 
    ? canvasSuggestions.map(s => s.url).filter(url => isValidUrl(url))
    : isValidUrl(improvementImageUrl) ? [improvementImageUrl] : [];
  
  const currentImageUrl = imageUrls.length > 0 ? imageUrls[currentImageIndex] : '';
  const currentText = canvasSuggestions.length > 0 && canvasSuggestions[currentImageIndex]
    ? canvasSuggestions[currentImageIndex].copywriting
    : improvementText;
  
  const hasValidImageUrl = isValidUrl(currentImageUrl);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const tabs = [
    { id: 'productAppeal' as InsightTab, label: '제품소구' },
    { id: 'salesStrategy' as InsightTab, label: '판매전략' },
    { id: 'improvement' as InsightTab, label: '상세페이지 개선 아이디어' },
  ];

  return (
    <div className="self-stretch p-7 bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
      <div className="w-[1184px] flex flex-col justify-start items-start gap-5">
        <div className="w-96 flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-zinc-900 text-xl font-bold font-['Pretendard'] leading-8">
            인사이트
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-[60px] inline-flex flex-col justify-start items-start gap-2.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-400'
                    : 'bg-neutral-100'
                }`}
              >
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div
                    className={`text-center text-base font-['Pretendard'] leading-6 ${
                      activeTab === tab.id
                        ? 'text-white font-bold'
                        : 'text-zinc-600 font-semibold'
                    }`}
                  >
                    {tab.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'productAppeal' || activeTab === 'salesStrategy' ? (
          <div className="w-full p-6 bg-neutral-100 rounded-3xl flex flex-col justify-start items-start gap-2.5">
            <div className="w-full h-[300px] flex flex-col justify-start items-start gap-4">
              <div className="self-stretch justify-start text-zinc-900 text-lg font-medium font-['Pretendard'] leading-7">
                {activeTab === 'productAppeal' ? productAppealText || 'Text Area' : salesStrategyText || 'Text Area'}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[1184px] p-6 bg-neutral-100 rounded-3xl inline-flex justify-start items-start gap-8">
            <div className="w-96 min-h-[694px] rounded-[20px] border border-zinc-400 relative overflow-hidden shrink-0">
              {hasValidImageUrl ? (
                <>
                  <Image
                    key={currentImageIndex}
                    src={currentImageUrl}
                    alt="개선 아이디어"
                    width={384}
                    height={694}
                    className="w-full h-full object-cover"
                  />
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {imageUrls.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full min-h-[694px] bg-gray-200 flex items-center justify-center">
                  <span className="text-zinc-500 text-sm">이미지</span>
                </div>
              )}
            </div>
            <div className="flex-1 bg-white rounded-[20px] inline-flex flex-col justify-start items-start gap-4 p-6">
              <div 
                className="self-stretch h-[650px] justify-start text-zinc-900 text-lg font-medium font-['Pretendard'] leading-7"
                dangerouslySetInnerHTML={{ 
                  __html: currentText || 'Text Area<br/>(어떻게 개선하라는 안내)' 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

