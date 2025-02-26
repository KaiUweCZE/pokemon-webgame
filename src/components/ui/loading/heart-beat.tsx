import { cn } from "@/utils/cn";

const HeartBeat = ({ className }: { className?: string }) => {
  return (
    <div className={cn("heart-loading max-w-full", className)}>
      <svg className="h-6 w-8">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        ></polyline>
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        ></polyline>
      </svg>
    </div>
  );
};

export default HeartBeat;
