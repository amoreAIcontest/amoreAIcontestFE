import Image from 'next/image';

interface ImageComponentProps {
  imageUrl: string;
  title: string;
}

export default function ImageComponent({ imageUrl, title }: ImageComponentProps) {
  return (
    <div className="w-60 inline-flex flex-col justify-start items-start gap-5">
      <Image
        src={imageUrl}
        alt={title}
        width={240}
        height={240}
        className="self-stretch h-60 rounded-[20px] object-cover"
      />
      <div className="self-stretch justify-start text-black text-base font-normal font-['Pretendard'] leading-6">
        {title}
      </div>
    </div>
  );
}

