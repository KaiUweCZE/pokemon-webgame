import { cn } from "@/utils/cn";
import { capitalize } from "@/utils/string";
import ProgressBar from "../progress-bar";
import { useState } from "react";
import { X } from "lucide-react";

export type ToastVariant = "success" | "error" | "warning";

const ANIMATION_DURATION = 300;

interface ToastProps {
  message: string;
  variant: ToastVariant;
  isVisible: boolean;
  onClose: () => void;
  headline?: string | null;
  duration?: number;
}
const variants = {
  success: {
    bgColor: "bg-green-50",
    accentColor: "bg-green-600",
    lightAccentColor: "bg-green-600/50",
    borderColor: "border-green-500",
    textColor: "text-green-800",
    iconColor: "text-green-500",
    hoverColor: "hover:bg-green-500/20",
  },
  error: {
    bgColor: "bg-red-50",
    accentColor: "bg-red-600",
    lightAccentColor: "bg-red-600/50",
    borderColor: "border-red-500",
    textColor: "text-red-800",
    iconColor: "text-red-500",
    hoverColor: "hover:bg-red-500/20",
  },
  warning: {
    bgColor: "bg-yellow-50",
    accentColor: "bg-yellow-600",
    lightAccentColor: "bg-yellow-600/50",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-500",
    hoverColor: "hover:bg-yellow-500/20",
  },
};

export const Toast = ({
  message,
  variant,
  isVisible,
  onClose,
  headline,
  duration = 3000,
}: ToastProps) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const currentVariant = variants[variant];

  if (!isVisible && !isLeaving) return null;

  if (!isVisible && isLeaving) {
    setTimeout(() => setIsLeaving(false), ANIMATION_DURATION);
  }

  const handleClose = () => {
    setIsLeaving(true);
    onClose();
  };

  return (
    <div className={cn("toast fixed bottom-4 left-4 z-50", isLeaving && "toast-leave")}>
      <div className="relative flex w-64 overflow-hidden rounded-sm shadow-lg">
        {/* left border */}
        <div className={cn("absolute left-0 top-0 h-full w-1", currentVariant.accentColor)} />

        <div
          className={cn("flex-1 px-4 py-3 pl-6", currentVariant.bgColor, currentVariant.textColor)}
        >
          <div className="pr-6">
            <h3 className="text-md mb-1 font-semibold">{headline ?? capitalize(variant)}</h3>
            <p className="text-sm">{message}</p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className={cn(
              "absolute right-2 top-2 rounded-full p-1 transition-colors",
              currentVariant.hoverColor
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ProgressBar
          duration={duration}
          onComplete={onClose}
          primaryColor={currentVariant.accentColor}
          secondaryColor={currentVariant.lightAccentColor}
          className={currentVariant.accentColor}
          setIsLeaving={setIsLeaving}
        />
      </div>
    </div>
  );
};
