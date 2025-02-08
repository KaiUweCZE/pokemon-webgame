import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { GradientBackground } from "@/components/ui/primitives/gradient-background";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, children }: DialogProps) => {
  return (
    <div className="absolute grid w-1/2 place-self-center rounded-sm border bg-primary-dark/70 p-4 shadow-primary backdrop-blur-sm">
      {children}
      <GradientBackground intensity="high" variant="ancient" direction="bottom-left" />
    </div>
  );
};

export default Dialog;
