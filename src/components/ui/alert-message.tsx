"use client";

import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type AlertMessageProps = {
  type: "error" | "success" | "info";
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
};

export function AlertMessage({
  type,
  children,
  className,
  onDismiss,
}: AlertMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const typeStyles = {
    error: "bg-amber-600/20 border-amber-500/30 text-amber-200",
    success: "bg-indigo-600/20 border-indigo-500/30 text-indigo-200",
    info: "bg-slate-800/50 border-slate-700/30 text-slate-200",
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  useEffect(() => {
    if (type !== "error") {
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [type]);

  return isVisible ? (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-300",
        typeStyles[type],
        className
      )}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm">{children}</span>
        <button
          onClick={handleDismiss}
          className="ml-4 hover:opacity-80 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : null;
}