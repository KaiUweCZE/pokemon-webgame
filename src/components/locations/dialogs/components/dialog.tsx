import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";
import { cn } from "@/utils/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Dialog = ({ open, onClose, children, className }: DialogProps) => {
  return (
    <div
      className={cn(
        "absolute grid w-1/2 place-self-center rounded-sm border bg-primary-dark/70 shadow-primary backdrop-blur-sm",
        className
      )}
    >
      {children}
      <GradientBackground intensity="high" variant="ancient" direction="bottom-left" />
    </div>
  );
};

export default Dialog;
