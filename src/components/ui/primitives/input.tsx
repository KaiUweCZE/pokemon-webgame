"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
  `flex w-full rounded-md focus:outline-none 
  focus:ring-2 focus:ring-purple-500/30
  disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "bg-background border border-slate-950",
        secondary:
          "bg-white/5 text-slate-100 placeholder:text-slate-600 border border-purple-500/20",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-fit px-2 py-0 text-sm",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
