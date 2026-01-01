'use client';

import Image from 'next/image';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full flex justify-start items-center gap-3 px-4 py-4 bg-white rounded-lg border border-green-500">
      <div className="w-6 h-6 relative shrink-0">
        <Image
          src="/icons/home-icon/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="w-full h-full"
        />
      </div>
      <input
        type="text"
        placeholder="제품을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-zinc-500 text-lg font-normal font-['Pretendard'] leading-7 placeholder:text-zinc-500"
      />
    </div>
  );
}

