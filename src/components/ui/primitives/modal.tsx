"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEscapeKey } from "@/hooks/use-escape";
import { useRestrictScroll } from "@/hooks/use-restrict-scroll";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Button } from "./button";
import { LoadingOverlay } from "../loading/loading-overlay";

const modalVariants = cva(
  `fixed w-screen h-screen inset-0 z-50 backdrop-blur-[1px] flex items-center justify-center p-4
   bg-black/50 blur-on-quick`,
  {
    variants: {
      variant: {
        default: "",
        danger: "",
        warning: "",
      },
      size: {
        default: "",
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
  `relative grid gap-4 rounded-lg bg-secondary p-6 shadow-lg duration-200
   animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`,
  {
    variants: {
      variant: {
        default: "border border-purple-800/70",
        danger: "border-2 border-destructive/50",
        warning: "border-2 border-yellow-500/50",
      },
      size: {
        default: "w-medium",
        sm: "w-fit p-4",
        lg: "w-large p-8",
        full: "w-full p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const overlayVariants = cva(``, {
  variants: {
    variant: {
      default: "bg-slate-950/90",
      danger: "bg-destructive",
      warning: "bg-yellow-500/",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva(`h-4 w-4`, {
  variants: {
    variant: {
      default: "text-amber-200",
      danger: "text-destructive",
      warning: "text-yellow-500",
    },
    size: {
      default: "2",
      sm: "1.5",
      lg: "2.5",
      full: " 3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ModalVariantProps = VariantProps<typeof modalVariants>;

export interface ModalProps extends ModalVariantProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  preventClose?: boolean;
  className?: string;
  iconWidth?: number;
}

export function Modal({
  isOpen,
  onClose,
  isLoading,
  title,
  description,
  children,
  variant,
  size,
  showCloseButton = true,
  preventClose = false,
  className,
  iconWidth = 3,
}: ModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  useEscapeKey(onClose, isOpen && !preventClose);
  //useRestrictScroll(isOpen);
  useClickOutside(contentRef, onClose, isOpen && !preventClose);
  if (!isOpen) return null;

  return (
    <div className={cn(modalVariants({ variant, size }))}>
      <div ref={contentRef} className={cn(modalContentVariants({ variant, size }), className)}>
        {isLoading && <LoadingOverlay bgColor={overlayVariants({ variant })} />}
        {showCloseButton && !preventClose && (
          <Button
            variant="basic"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className={cn(iconVariants({ variant, size }))} strokeWidth={iconWidth} />
          </Button>
        )}

        <div className="grid gap-4">
          {title && (
            <div className="flex flex-col space-y-1.5">
              <h2 className="text-lg font-medium text-amber-100">{title}</h2>
              {description && <p className="text-sm text-primary-text">{description}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
