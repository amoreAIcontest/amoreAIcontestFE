import Header from '../_components/Header';
import DetailContent from '../_components/DetailContent';

export default function DetailPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full max-w-[1440px] mx-auto px-[100px] py-8 flex flex-col gap-8">
        <DetailContent />
      </div>
    </div>
  );
}

