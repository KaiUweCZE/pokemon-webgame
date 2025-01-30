const LoadingFull = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm transition-opacity">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-3">
          {/* spinner */}
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 opacity-50"></div>
          </div>

          {/* pulsing dots */}
          <div className="flex items-center gap-2">
            <span className="animate-pulse font-medium text-gray-600">Loading your journey</span>
            <span className="animate-[bounce_1s_infinite] text-xl">.</span>
            <span className="animate-[bounce_1s_infinite_100ms] text-xl">.</span>
            <span className="animate-[bounce_1s_infinite_200ms] text-xl">.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFull;
