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
        light: "",
        secondary: "bg-transparent",
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
  `relative grid gap-4 rounded-lg  p-6 shadow-lg duration-200
   animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`,
  {
    variants: {
      variant: {
        default: "bg-secondary/80 backdrop-blur-[4px] border border-purple-400/30",
        danger: "bg-destructive border-2 border-destructive/50",
        warning: "bg-amber-200/80 border-2 border-slate-800/20",
        light: "bg-primary border border-white/20",
        secondary: "bg-primary-dark/80 border-purple-800/30 border",
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
      light: "bg-red-200",
      danger: "bg-destructive",
      warning: "bg-slate-800/80",
      secondary: "bg-red-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva(`h-4 w-4`, {
  variants: {
    variant: {
      default: "text-purple-400",
      danger: "text-destructive",
      warning: "text-slate-800/80",
      light: "text-white",
      secondary: "text-red-200",
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

const textVariants = cva(`text-sm`, {
  variants: {
    variant: {
      default: "text-purple-50",
      danger: "text-destructive",
      warning: "text-slate-800/80",
      light: "text-white",
      secondary: "text-red-200",
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
            <article className="grid space-y-1.5">
              <h2
                className={cn(
                  textVariants({ variant }),
                  "w-fit place-self-center text-lg font-medium"
                )}
              >
                {title}
              </h2>
              {description && <p className={cn(textVariants({ variant }))}>{description}</p>}
            </article>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
