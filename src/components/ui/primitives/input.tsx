"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
  `flex w-full overflow-hidden focus:outline-none 
  focus:ring-2 focus:ring-purple-500/30
  disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "bg-background border border-slate-950",
        primary:
          "bg-violet-50/60 border-b-2 focus:bg-violet-50 border-violet-300/40 text-slate-900 placeholder:text-slate-600",
        secondary:
          "bg-white/5 text-slate-100 placeholder:text-slate-600 border border-purple-500/20",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm rounded-sm",
        sm: "h-fit px-2 py-0 text-sm",
        lg: "h-12 px-4",
      },
      shadow: {
        true: "shadow-secondary",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: false,
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, shadow, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className, shadow }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
