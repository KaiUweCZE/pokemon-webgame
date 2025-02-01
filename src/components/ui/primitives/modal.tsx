"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEscapeKey } from "@/hooks/use-escape";
import { useRestrictScroll } from "@/hooks/use-restrict-scroll";
import { useClickOutside } from "@/hooks/use-click-outside";

const modalVariants = cva(
  `fixed inset-0 z-50 flex items-center justify-center p-4
   bg-black/50 animate-in fade-in-0 duration-200`,
  {
    variants: {
      variant: {
        default: "",
        danger: "",
        warning: "",
      },
      size: {
        default: "sm:max-w-[425px]",
        sm: "sm:max-w-[384px]",
        lg: "sm:max-w-[512px]",
        full: "sm:max-w-[100vw] sm:h-[100vh]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const modalContentVariants = cva(
  `relative grid w-full gap-4 rounded-lg bg-secondary-background p-6 shadow-lg duration-200
   animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`,
  {
    variants: {
      variant: {
        default: "border-2 border-amber-200/20",
        danger: "border-2 border-destructive/50",
        warning: "border-2 border-yellow-500/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type ModalVariantProps = VariantProps<typeof modalVariants>;

export interface ModalProps extends ModalVariantProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  preventClose?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  variant,
  size,
  showCloseButton = true,
  preventClose = false,
  className,
}: ModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  useEscapeKey(onClose, isOpen && !preventClose);
  //useRestrictScroll(isOpen);
  useClickOutside(contentRef, onClose, isOpen && !preventClose);
  if (!isOpen) return null;

  return (
    <div className={cn(modalVariants({ variant, size }))}>
      <div ref={contentRef} className={cn(modalContentVariants({ variant }), className)}>
        {showCloseButton && !preventClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4 text-primary-text" />
          </button>
        )}

        <div className="grid gap-4">
          {title && (
            <div className="flex flex-col space-y-1.5">
              <h2 className="text-lg font-semibold text-amber-200">{title}</h2>
              {description && <p className="text-sm text-primary-text">{description}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
