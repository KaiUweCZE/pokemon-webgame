"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { useRipple } from "@/hooks/ui/use-ripple";

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-sm text-sm gap-2
  font-medium transition-all duration-300 
  focus:outline-none focus:ring-2 focus:ring-purple-500/30
  disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary: "hover:bg-element bg-primary text-amber-100 shadow-primary",
        secondary: "bg-secondary hover:bg-slate-800 text-amber-100 shadow-primary-light",
        light: "bg-content hover:bg-content-secondary text-slate-900 shadow-secondary",
        basic: "bg-transparent hover:bg-transparent shadow-secondary",
        destructive:
          "bg-destructive hover:bg-destructive-secondary text-amber-100 shadow-secondary",
        outline: "hover:bg-amber-100/20 border border-input text-amber-100 shadow-secondary",
        ghost: "bg-amber-100/30 hover:bg-amber-100/80 shadow-secondary",
        accent: "bg-element-light hover:bg-element shadow-secondary border-amber-100/20 border",
        link: "animation-link shadow-secondary",
      },
      size: {
        default: "w-fit py-2 px-4 ",
        sm: "px-2 py-1 rounded-sm",
        lg: "px-8 rounded-md",
        icon: "w-fit h-fit",
        full: "w-full h-full",
      },
      shadow: {
        true: "",
        false: "shadow-no",
      },
      isActive: {
        true: "border-slate-950 text-amber-200",
        false: "",
      },
      border: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "light",
        border: true,
        className: "border border-slate-800/20",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      isActive: false,
      shadow: false,
    },
  }
);

const rippleConfig = {
  primary: {
    colorClass: "bg-amber-100/40",
    duration: 400,
    scale: 0.8,
  },
  secondary: {
    colorClass: "bg-amber-100/80",
    duration: 400,
    scale: 0.8,
  },
  light: {
    colorClass: "bg-slate-950/60",
    duration: 400,
    scale: 0.8,
  },
  basic: {
    colorClass: "bg-amber-100/30",
    duration: 1000,
    scale: 4.5,
  },
  destructive: {
    colorClass: "bg-amber-100/60",
    duration: 800,
    scale: 2,
  },
  outline: {
    colorClass: "bg-amber-200/80",
    duration: 500,
    scale: 0.5,
  },
  ghost: {
    colorClass: "bg-slate-900/30",
    duration: 500,
    scale: 1,
  },
  link: {
    colorClass: "bg-slate-950/90",
    duration: 300,
    scale: 0.5,
  },
  accent: {
    colorClass: "bg-amber-200/80",
    duration: 500,
    scale: 0.5,
  },
} as const;

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  asChild?: boolean;
  active?: boolean;
  withRipple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      border,
      size,
      children,
      shadow,
      active,
      isLoading,
      loadingText,
      asChild = false,
      leftIcon,
      rightIcon,
      withRipple = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const rippleProps = useRipple({
      enabled: withRipple,
      ...(variant && rippleConfig[variant]),
      disabled: isLoading || props.disabled,
    });

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
          buttonVariants({ variant, size, isActive: active, border, className, shadow }),
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
