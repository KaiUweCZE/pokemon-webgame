const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-100 delay-0"></div>
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-100 delay-150"></div>
      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-100 delay-300"></div>
    </div>
  );
};

export default LoadingDots;
