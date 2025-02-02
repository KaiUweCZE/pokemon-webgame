import { cn } from "@/utils/cn";

export const LoadingOverlay = ({ bgColor }: { bgColor: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm",
        bgColor
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 animate-spin">
            <div className="h-8 w-8 rounded-full border-2 border-amber-100/20 border-t-amber-100"></div>
          </div>
        </div>
        <span className="text-sm text-amber-100/80">Processing...</span>
      </div>
    </div>
  );
};
