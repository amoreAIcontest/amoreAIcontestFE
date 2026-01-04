export default function DetailContentSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-8">
        <div className="inline-flex justify-start items-center gap-1">
          <div className="h-8 w-24 bg-neutral-200 rounded animate-pulse" />
          <div className="w-6 h-6 bg-neutral-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-neutral-200 rounded animate-pulse" />
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-9">
          <div className="w-96 h-96 bg-neutral-200 rounded animate-pulse" />
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse" />
            <div className="self-stretch inline-flex justify-start items-start gap-4 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 w-32 bg-neutral-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full bg-white p-7 rounded-[32px] flex flex-col gap-8">
        <div className="w-full flex gap-5">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
            <div className="w-[375px] h-[335px] p-6 bg-neutral-100 rounded-3xl flex flex-col gap-2.5">
              <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse" />
              <div className="flex flex-wrap gap-x-2 gap-y-1.5 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-14 w-32 bg-neutral-200 rounded-[34px] animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="h-8 w-40 bg-neutral-200 rounded animate-pulse" />
            <div className="flex gap-5">
              <div className="flex-1 h-64 bg-neutral-200 rounded animate-pulse" />
              <div className="flex-1 h-64 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Images and Reviews */}
        <div className="w-full flex gap-5 justify-center">
          <div className="w-96 h-96 bg-neutral-200 rounded animate-pulse" />
          <div className="flex-1 h-96 bg-neutral-200 rounded animate-pulse" />
        </div>

        {/* Analysis Comparison */}
        <div className="w-full h-64 bg-neutral-200 rounded animate-pulse" />

        {/* Insight Section */}
        <div className="w-full h-96 bg-neutral-200 rounded animate-pulse" />
      </div>
    </>
  );
}

