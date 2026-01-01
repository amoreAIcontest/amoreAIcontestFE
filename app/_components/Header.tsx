import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full h-14 py-4 bg-white flex flex-col justify-center items-start gap-2.5">
      <div className="w-full flex justify-between items-center max-w-[1440px] mx-auto px-4">
        <div className="flex items-center">
          <Image
            src="/icons/home-icon/logo.svg"
            alt="Logo"
            width={163}
            height={20}
            className="h-5"
          />
        </div>
        <div className="flex justify-start items-center gap-[23px]">
          <Link href="/" className="w-6 h-6 relative shrink-0">
            <Image
              src="/icons/home-icon/home.svg"
              alt="Home"
              width={24}
              height={24}
              className="w-full h-full"
            />
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative shrink-0">
              <Image
                src="/icons/home-icon/userDefault.svg"
                alt="User"
                width={24}
                height={24}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="text-slate-500 text-base font-medium font-['Pretendard'] leading-6">
              User Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

