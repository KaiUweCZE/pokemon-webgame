"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { useRipple } from "@/hooks/ui/use-ripple";

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-sm text-sm 
  font-medium transition-all duration-300 
  focus-visible:outline-none focus-visible:ring-1 
  focus-visible:ring-amber-200 focus-visible:ring-offset-1 
  disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default: "bg-element hover:bg-primary",
        basic: "bg-transparent hover:bg-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-slate-950 hover:bg-slate-950/50",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: " transition-all duration-200 border-b-2 border-transparent hover:border-slate-950 rounded-none px-2",
      },
      size: {
        default: "py-2 px-4",
        sm: "px-2 py-1 rounded-sm",
        lg: "px-8 rounded-md",
        icon: "w-fit h-fit",
      },
      isActive: {
        true: "border-slate-950 text-amber-200",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  asChild?: boolean;
  active?: boolean;
  withRipple?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
  rippleScale?: number;
  buttonName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      active,
      isLoading,
      loadingText,
      asChild = false,
      leftIcon,
      rightIcon,
      withRipple = false,
      rippleColor,
      rippleDuration,
      rippleScale,
      onClick,
      ...props
    },
    ref
  ) => {
    const rippleProps = withRipple
      ? useRipple({
          colorClass: rippleColor,
          duration: rippleDuration,
          scale: rippleScale,
          disabled: isLoading || props.disabled,
        })
      : null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withRipple && rippleProps) {
        rippleProps.createRipple(e);
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, isActive: active, className }),
          withRipple ? "relative overflow-hidden" : "",
          "group"
        )}
        ref={ref}
        disabled={isLoading}
        onClick={handleClick}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
        {withRipple && rippleProps && <rippleProps.RippleContainer />}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
