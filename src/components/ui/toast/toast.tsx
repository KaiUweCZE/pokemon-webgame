import { cn } from "@/utils/cn";
import { Check, X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export type ToastVariant = "success" | "error" | "warning";

interface ToastProps {
  message: string;
  variant: ToastVariant;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const variants = {
  success: {
    icon: Check,
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    textColor: "text-green-800",
    iconColor: "text-green-500",
  },
  error: {
    icon: X,
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
    textColor: "text-red-800",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-500",
  },
};

export const Toast = ({
  message,
  variant,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  const currentVariant = variants[variant];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 toast">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-lg border",
          currentVariant.bgColor,
          currentVariant.borderColor,
          currentVariant.textColor
        )}
      >
        <currentVariant.icon
          className={cn("w-5 h-5", currentVariant.iconColor)}
        />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
